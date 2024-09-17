import yt_dlp
import os
from datetime import datetime
import requests
import logging
import time

# Ваши переменные
SCADE_FLOW = 37048
SCADE_ACCESS_TOKEN = "NWJhNjYxZjktNDIwNS00YWYwLThmYzctYjMzMGE1ODY4YTk5Om9SblZPOWJtNU83RHhWSDZqUDFlaE8wZlV5eW05ZA=="


def download_audio(url, output_folder='audio_files'):
    # Создаем папку, если она не существует
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Получаем текущую дату и время для уникального имени файла
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(output_folder, f'audio_{timestamp}.mp3')

    # Настройки для извлечения только аудио
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_file,
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
        print(f'Аудио успешно извлечено и сохранено как {output_file}')

        # Отправка аудиофайла на Scade
        task_id = start_scade_flow(SCADE_FLOW, SCADE_ACCESS_TOKEN, output_file)
        if task_id:
            result = get_scade_result(task_id, SCADE_ACCESS_TOKEN)
            print(f'Результат Scade: {result}')
        else:
            print('Ошибка при запуске флоу на Scade.')
    except Exception as e:
        print(f'Ошибка при извлечении аудио: {e}')


def start_scade_flow(flow_id, scade_access_token, audio_file_path):
    url = f"https://api.scade.pro/api/v1/scade/flow/{flow_id}/execute"
    headers = {
        "Authorization": f"Basic {scade_access_token}",
    }
    files = {
        "file": open(audio_file_path, "rb")
    }
    data = {
        "start_node_id": "axi1-start",
        "end_node_id": "AQ6K-end",
        "result_node_id": "AQ6K-end"
    }
    response = requests.post(url, headers=headers, data=data, files=files)
    if response.status_code == 200:
        return response.json()['id']
    else:
        logging.error(f"Ошибка при запуске флоу: {response.status_code}")
        return None


def get_scade_result(task_id, scade_access_token):
    result_url = f"https://api.scade.pro/api/v1/task/{task_id}"
    headers = {
        "Authorization": f"Basic {scade_access_token}",
        "Content-Type": "application/json"
    }
    while True:
        response = requests.get(result_url, headers=headers)
        if response.status_code == 200:
            result_data = response.json()
            if result_data['status'] == 3:  # Task completed
                return result_data['result']
            else:
                logging.info("Задача в процессе выполнения...")
        else:
            logging.error(f"Ошибка при получении результата: {response.status_code}")
        time.sleep(5)


# Пример использования
# url = 'https://www.instagram.com/reel/C_sO1MWtZv6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='  # Замените на нужный URL
download_audio(url)
