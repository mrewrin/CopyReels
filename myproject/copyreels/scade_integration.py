import yt_dlp
import os
import json
import requests
import logging
import time
from datetime import datetime
from celery import shared_task
from .models import VideoProcessResult

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Ваши переменные
SCADE_FLOW = 37048
SCADE_ACCESS_TOKEN = "NWJhNjYxZjktNDIwNS00YWYwLThmYzctYjMzMGE1ODY4YTk5Om9SblZPOWJtNU83RHhWSDZqUDFlaE8wZlV5eW05ZA=="


def upload_to_file_io(file_path):
    try:
        logging.info(f"Начало загрузки файла {file_path} на file.io")
        with open(file_path, 'rb') as f:
            files = {'file': f}
            response = requests.post('https://file.io/', files=files)
            if response.status_code == 200:
                response_data = response.json()
                if response_data.get('success'):
                    logging.info(f"Файл успешно загружен на file.io: {response_data.get('link')}")
                    return response_data.get('link')
                else:
                    logging.error(f"Ошибка при загрузке на file.io: {response_data.get('message')}")
            else:
                logging.error(f"Ошибка при загрузке на file.io: {response.status_code} {response.text}")
    except Exception as e:
        logging.error(f"Ошибка при загрузке на file.io: {e}")
    return None


def download_audio(url, output_folder='audio_files'):
    logging.info(f"Начало загрузки и извлечения аудио из {url}")
    # Создаем папку, если она не существует
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Получаем текущую дату и время для уникального имени файла
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(output_folder, f'audio_{timestamp}')

    # Настройки для извлечения только аудио
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_file + '.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'noplaylist': True,  # Отключить скачивание плейлистов, если URL указывает на плейлист
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Проверка на существование файла и получение полного пути
        output_file_with_ext = output_file + '.mp3'
        if os.path.exists(output_file_with_ext):
            logging.info(f'Аудио успешно извлечено и сохранено как {output_file_with_ext}')

            # Загрузка аудиофайла на File.io
            file_url = upload_to_file_io(output_file_with_ext)
            if file_url:
                logging.info(f'Файл успешно загружен на file.io: {file_url}')

                # Отправка ссылки на аудиофайл в Scade
                task_id = start_scade_flow(SCADE_FLOW, SCADE_ACCESS_TOKEN, file_url)
                if task_id:
                    # Получение результата от Scade
                    result = get_scade_result(task_id, SCADE_ACCESS_TOKEN)
                    logging.info(f'Результат Scade: {result}')
                    if result:
                        return {'Transcribation': result['Transcribation'], 'Rewriting': result['Rewriting']}
                    return None
                else:
                    logging.error('Ошибка при запуске флоу на Scade.')
            else:
                logging.error('Ошибка при загрузке файла на file.io.')
        else:
            logging.error(f'Ошибка: Файл {output_file_with_ext} не найден.')
    except Exception as e:
        logging.error(f'Ошибка при извлечении аудио: {e}')


def start_scade_flow(flow_id, scade_access_token, audio_file_url):
    logging.info(f"Запуск потока Scade для URL {audio_file_url}")
    url = f"https://api.scade.pro/api/v1/scade/flow/{flow_id}/execute"
    headers = {
        "Authorization": f"Basic {scade_access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "start_node_id": "KgoQ-start",
        "end_node_id": "AQ6K-end",
        "result_node_id": "AQ6K-end",
        "node_settings": {
            "KgoQ-start": {
                "data": {
                    "audio": audio_file_url
                }
            }
        }
    }

    try:
        # Увеличен timeout до 120 секунд
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        response.raise_for_status()
        response_data = response.json()
        logging.info(f"Ответ от Scade API: {response.status_code} - {response.text}")
        return response_data.get('id')
    except requests.exceptions.HTTPError as http_err:
        logging.error(f"HTTP ошибка при запуске флоу: {http_err}")
    except requests.exceptions.RequestException as err:
        logging.error(f"Ошибка при отправке запроса к Scade API: {err}")
    except Exception as e:
        logging.error(f"Неожиданная ошибка при запуске флоу: {e}")
    return None


def get_scade_result(task_id, scade_access_token, max_attempts=25, timeout=300):
    logging.info(f"Ожидание завершения задачи Scade с ID {task_id}")
    result_url = f"https://api.scade.pro/api/v1/task/{task_id}"
    headers = {
        "Authorization": f"Basic {scade_access_token}",
        "Content-Type": "application/json"
    }
    attempts = 0
    while attempts < max_attempts:
        try:
            response = requests.get(result_url, headers=headers, timeout=timeout)
            response.raise_for_status()
            result_data = response.json()
            if result_data['status'] == 3:  # Task completed
                logging.info("Задача Scade завершена")
                return result_data['result']
            else:
                logging.info(f"Задача в процессе выполнения. Попытка {attempts + 1}/{max_attempts}")
        except requests.exceptions.HTTPError as http_err:
            logging.error(f"HTTP ошибка при получении результата: {http_err}")
            break
        except requests.exceptions.RequestException as err:
            logging.error(f"Ошибка при получении результата: {err}")
            break
        except Exception as e:
            logging.error(f"Неожиданная ошибка при проверке статуса задачи Scade: {e}")
            break
        time.sleep(10)  # Увеличиваем задержку между попытками до 10 секунд
        attempts += 1
    logging.error(f"Задача Scade не завершена после {max_attempts} попыток.")
    return None


@shared_task
def process_video_task(url, user_info):
    logging.info(f"Начата обработка видео с URL: {url} для пользователя: {user_info}")

    # Этап 1: Скачивание аудио
    logging.info("Начато скачивание аудио.")
    result = download_audio(url)
    if result:
        logging.info("Аудио успешно скачано и обработано.")

        # Этап 2: Сохранение результатов в базу данных
        logging.info("Начинаем сохранение результатов в базу данных.")
        video_result = VideoProcessResult.objects.create(
            url=url,
            user_info=user_info,
            transcribation=result.get('Transcribation', ''),
            rewriting=result.get('Rewriting', '')
        )
        logging.info(f"Результаты сохранены в базу данных с ID: {video_result.id}")

        return video_result.id
    else:
        logging.error("Ошибка при скачивании аудио или его обработке.")

    return None

