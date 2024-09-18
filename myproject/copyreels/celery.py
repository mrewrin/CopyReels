from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Задаем переменные окружения Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'copyreels.settings')

app = Celery('copyreels')
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматически обнаруживаем задачи в приложении
app.autodiscover_tasks()
