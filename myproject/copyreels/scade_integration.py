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

    payload = json.dumps({
        "start_node_id": "KgoQ-start",
        "end_node_id": "AQ6K-end",
        "result_node_id": "AQ6K-end",
        "node_settings": {
            "KgoQ-start": {
                "data": {
                    "audio": audio_file_url  # Передаем URL файла как строку
                }
            }
        }
    })

    try:
        response = requests.post(url, headers=headers, data=payload)
        logging.info(f"Ответ от Scade API: {response.status_code} - {response.text}")
        if response.status_code == 200:
            logging.info("Запрос к Scade API успешно отправлен")
            return response.json().get('id')
        else:
            logging.error(f"Ошибка при запуске флоу: {response.status_code}, Response content: {response.content}")
            return None
    except Exception as e:
        logging.error(f"Ошибка при отправке запроса к Scade API: {e}")
        return None



def get_scade_result(task_id, scade_access_token, max_attempts=50):
    logging.info(f"Ожидание завершения задачи Scade с ID {task_id}")
    result_url = f"https://api.scade.pro/api/v1/task/{task_id}"
    headers = {
        "Authorization": f"Basic {scade_access_token}",
        "Content-Type": "application/json"
    }
    attempts = 0
    while attempts < max_attempts:
        try:
            response = requests.get(result_url, headers=headers)
            if response.status_code == 200:
                result_data = response.json()
                if result_data['status'] == 3:  # Task completed
                    logging.info("Задача Scade завершена")
                    return result_data['result']
                else:
                    logging.info("Задача в процессе выполнения...")
            else:
                logging.error(f"Ошибка при получении результата: {response.status_code}")
            time.sleep(5)
            attempts += 1
        except Exception as e:
            logging.error(f"Ошибка при проверке статуса задачи Scade: {e}")
            break
    logging.error(f"Задача Scade не завершена после {max_attempts} попыток.")
    return None


@shared_task
def process_video_task(url, user_info):
    result = download_audio(url)
    if result:
        # Сохранение результатов в базу данных
        video_result = VideoProcessResult.objects.create(
            url=url,
            user_info=user_info,
            transcribation=result.get('Transcribation', ''),
            rewriting=result.get('Rewriting', '')
        )
        return video_result.id
    return None
