import yt_dlp
import os
import json
import requests
import logging
import time
from datetime import datetime
from celery import shared_task
from .models import VideoProcessResult  # Importing the model for saving results

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Переменные для работы с Scade
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


# Список user-agent для различных браузеров
USER_AGENTS = {
    'chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'firefox': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
}

# Пути к файлам cookies для YouTube и Instagram
COOKIES_FILES = {
    'youtube': '/var/www/CopyReels/myproject/copyreels/www.youtube.com_cookies.txt',
    'instagram': '/var/www/CopyReels/myproject/copyreels/www.instagram.com_cookies.txt'
}


# Загрузка аудио с URL
def download_audio(url, output_folder='audio_files', throttled_rate='100K', proxy=None):
    logging.info(f"Начало загрузки и извлечения аудио из {url}")

    # Проверка наличия папки для сохранения аудио
    if not os.path.exists(output_folder):
        try:
            os.makedirs(output_folder)
            logging.info(f"Директория {output_folder} успешно создана.")
        except OSError as e:
            logging.error(f"Ошибка при создании директории {output_folder}: {e}")
            return None

    # Формирование имени файла с временной меткой
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(output_folder, f'audio_{timestamp}.mp3')

    # Определяем, для какого сервиса используются cookies
    if 'youtube' in url or 'youtu.be' in url:
        service = 'youtube'
    elif 'instagram' in url:
        service = 'instagram'
    else:
        logging.error(f"Неподдерживаемый сервис для URL: {url}")
        return None

    cookies_path = COOKIES_FILES.get(service)

    if not os.path.exists(cookies_path):
        logging.error(f"Файл cookies для {service} не найден по пути: {cookies_path}")
        return None

    logging.info(f"Используются cookies для {service}: {cookies_path}")

    # Параметры для yt-dlp
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_file + '.%(ext)s',
        'keepvideo': False,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'noplaylist': True,
        'throttled-rate': throttled_rate,
        'nocheckcertificate': True,
        # 'cookies': cookies_path,  # Если все же есть актуальный файл cookies
        'user-agent': USER_AGENTS.get('chrome'),  # Используем User-Agent для Chrome
    }

    # Добавляем логин и пароль, если работаем с Instagram или YouTube
    if 'instagram' in url:
        ydl_opts['username'] = 'mistaewrin'
        ydl_opts['password'] = 'B27b8393'
    elif 'youtube' in url:
        ydl_opts['username'] = 'mr.ewrin@gmail.com'
        ydl_opts['password'] = 'B27b8393!'

    if proxy:
        ydl_opts['proxy'] = proxy  # Добавляем прокси-сервер
        logging.info(f"Используется прокси-сервер: {proxy}")

    try:
        # Запуск загрузки через yt-dlp
        logging.info(f"Загрузка аудио началась с URL: {url}")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Проверка наличия сохраненного файла
        if os.path.exists(output_file):
            logging.info(f'Аудио успешно извлечено и сохранено как {output_file}')
            return output_file
        else:
            logging.error(f'Не удалось сохранить аудио файл: {output_file}')
            return None

    except Exception as e:
        logging.error(f'Ошибка при загрузке и извлечении аудио: {e}')
        return None


# Запуск потока Scade
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


# Получение результата задачи Scade
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


# Основная задача Celery
@shared_task
def process_video_task(url, user_info):
    logging.info(f"Запущена задача для обработки видео URL: {url}, пользователя: {user_info}")

    # Этап 1: Загрузка аудио
    audio_file_path = download_audio(url)
    if audio_file_path:
        logging.info(f"Аудио скачано и сохранено: {audio_file_path}")

        # Этап 2: Загрузка аудио на file.io для передачи в Scade
        file_io_link = upload_to_file_io(audio_file_path)
        if file_io_link:
            logging.info(f"Файл загружен на file.io: {file_io_link}")

            # Этап 3: Запуск потока Scade для обработки аудио
            task_id = start_scade_flow(SCADE_FLOW, SCADE_ACCESS_TOKEN, file_io_link)
            if task_id:
                logging.info(f"Задача Scade успешно запущена, ID: {task_id}")

                # Этап 4: Ожидание завершения задачи Scade и получение результатов
                scade_result = get_scade_result(task_id, SCADE_ACCESS_TOKEN)
                if scade_result:
                    logging.info(f"Результаты Scade получены: {scade_result}")

                    # Этап 5: Сохранение результата в базу данных
                    video_result = VideoProcessResult.objects.create(
                        url=url,
                        user_info=user_info,
                        transcribation=scade_result.get('Transcribation', ''),
                        rewriting=scade_result.get('Rewriting', '')
                    )
                    logging.info(f"Результаты сохранены в базу данных, ID: {video_result.id}")
                    return video_result
                else:
                    logging.error("Не удалось получить результаты Scade")
            else:
                logging.error("Ошибка при запуске задачи Scade")
        else:
            logging.error("Ошибка при загрузке файла на file.io")
    else:
        logging.error("Ошибка при скачивании аудио")
    return None