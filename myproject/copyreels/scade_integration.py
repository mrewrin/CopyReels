import os
import json
import requests
import mimetypes
import logging
import time
import subprocess
from datetime import datetime
from celery import shared_task
from apify_client import ApifyClient
from .models import VideoProcessResult  # Importing the model for saving results

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Переменные для работы с Scade
SCADE_FLOW = 37048
SCADE_ACCESS_TOKEN = "NWJhNjYxZjktNDIwNS00YWYwLThmYzctYjMzMGE1ODY4YTk5Om9SblZPOWJtNU83RHhWSDZqUDFlaE8wZlV5eW05ZA=="

# Настройка клиента Apify
APIFY_API_TOKEN = 'apify_api_QZszNnqD2DoI1Ueh2ac2TQieMQfOLe3taq2B'
client = ApifyClient(APIFY_API_TOKEN)


def download_social_media_audio(url):
    logging.info(f"Запуск загрузки аудио с {url} через нового актора")

    # Подготовка входных данных для актора
    actor_input = {
        "audioOnly": True,  # Установите True, если нужно скачать только аудио, False для полного видео
        "ffmpeg": True,  # Использовать ли ffmpeg для обработки
        "proxy": {
            "useApifyProxy": True,  # Включить использование Apify Proxy
            "apifyProxyGroups": ["RESIDENTIAL"],  # Указать группу прокси (например, residential)
        },
        "url": url # Ссылка на видео в Instagram для загрузки
    }

    try:
        # Запуск актора и ожидание завершения
        run = client.actor('JXsyluUMPERGlag4K').call(run_input=actor_input)
        logging.info(f"Задача выполнена, ответ актора: {run}")
        dataset_id = run["defaultDatasetId"]
        my_dataset_client = client.dataset(dataset_id)
        dataset = my_dataset_client.list_items(limit=1, desc=True)
        audio_url = dataset.items[0]['download_link']

        if audio_url:
            logging.info(f"Ссылка на скачивание аудиофайла: {audio_url}")
            return audio_url
        else:
            logging.error(f"Не удалось получить ссылку на аудио, ответ актора: {run}")
            return None
    except Exception as e:
        logging.error(f"Ошибка при выполнении задачи Apify: {e}")
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

    # Этап 1: Получение аудиофайла через нового актора Apify
    audio_file_url = download_social_media_audio(url)
    if audio_file_url:
        logging.info(f"Ссылка на аудиофайл получена: {audio_file_url}")

        # Этап 2: Запуск потока Scade для обработки аудио
        task_id = start_scade_flow(SCADE_FLOW, SCADE_ACCESS_TOKEN, audio_file_url)
        if task_id:
            logging.info(f"Задача Scade успешно запущена, ID: {task_id}")

            # Этап 3: Ожидание завершения задачи Scade и получение результатов
            scade_result = get_scade_result(task_id, SCADE_ACCESS_TOKEN)
            if scade_result:
                logging.info(f"Результаты Scade получены: {scade_result}")

                # Этап 4: Сохранение результата в базу данных
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
        logging.error("Не удалось получить аудиофайл через Apify")
    return None
