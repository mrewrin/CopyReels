from pathlib import Path

# ------------------------------------------------
# Основные настройки проекта
# ------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# Секретный ключ (не публиковать в открытых репозиториях)
SECRET_KEY = 'django-insecure-#ah$*4-(_mn$$_*h-47rrhr$e7ejl3%qgbe_qo7&p85)7pmf_v'

# Режим отладки (выключать в продакшене)
DEBUG = False  # Установите в False на продакшене

# Разрешённые хосты (заполнять в продакшене)
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '176.124.212.138', 'copyreels.ru', 'www.copyreels.ru']

# ------------------------------------------------
# Приложения
# ------------------------------------------------

INSTALLED_APPS = [
    # Приложения Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # Приложения сторонних разработчиков
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    # Приложения проекта
    'copyreels.apps.CopyreelsConfig',
]

# ------------------------------------------------
# Middleware (промежуточное ПО)
# ------------------------------------------------

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',  # Middleware от allauth
]

# ------------------------------------------------
# URL конфигурация
# ------------------------------------------------

ROOT_URLCONF = 'copyreels.urls'

# ------------------------------------------------
# Шаблоны
# ------------------------------------------------

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR.parent / 'build'],  # Путь к шаблонам проекта
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ------------------------------------------------
# WSGI приложение
# ------------------------------------------------

WSGI_APPLICATION = 'copyreels.wsgi.application'

# ------------------------------------------------
# База данных
# ------------------------------------------------

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ------------------------------------------------
# Валидация паролей
# ------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# ------------------------------------------------
# Интернационализация и временные зоны
# ------------------------------------------------

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True  # Локализация
USE_TZ = True  # Использование временных зон

# ------------------------------------------------
# Статические и медиа файлы
# ------------------------------------------------

# Статические файлы (CSS, JavaScript, изображения)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"  # Папка, куда collectstatic соберет все файлы

STATICFILES_DIRS = [
    BASE_DIR.parent / "build/static",
    BASE_DIR.parent / "src",
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Медиа файлы (для загрузки изображений и файлов)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ------------------------------------------------
# Настройки для allauth
# ------------------------------------------------

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Базовая аутентификация Django
    'allauth.account.auth_backends.AuthenticationBackend',  # Аутентификация через allauth
]

ACCOUNT_AUTHENTICATION_METHOD = 'username_email'  # Аутентификация по username и email
ACCOUNT_EMAIL_REQUIRED = True  # Email обязателен
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'  # Обязательное подтверждение email
LOGIN_REDIRECT_URL = '/'  # Перенаправление после входа
LOGOUT_REDIRECT_URL = '/'  # Перенаправление после выхода

SITE_ID = 1  # Настройка для django.contrib.sites

# Настройка подтверждения email
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 3  # Срок действия ссылки для подтверждения (в днях)
ACCOUNT_RATE_LIMITS = {
    'confirm_email': '5/m',  # Ограничение на подтверждение email (не более 5 писем в минуту)
}
ACCOUNT_EMAIL_SUBJECT_PREFIX = '[CopyReels]'  # Префикс в теме письма

# ------------------------------------------------
# Настройки почты
# ------------------------------------------------

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'mr.ewrin@gmail.com'  # Email отправителя
EMAIL_HOST_PASSWORD = 'ncnx uxsm phtv joiw'  # Пароль приложения Gmail
DEFAULT_FROM_EMAIL = 'mr.ewrin@gmail.com'  # Email по умолчанию для исходящих писем

# ------------------------------------------------
# Пользовательская модель
# ------------------------------------------------

AUTH_USER_MODEL = 'copyreels.CustomUser'

# ------------------------------------------------
# Дополнительные настройки
# ------------------------------------------------

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# ------------------------------------------------
# Логирование
# ------------------------------------------------

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO',  # Логирование в консоль
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': '/var/log/copyreels/debug.log',  # Путь к файлу логов
            'level': 'INFO',
        },
    },
    'root': {
        'handlers': ['console', 'file'],  # Логирование и в консоль, и в файл
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'copyreels': {  # Ваше приложение
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}


# ------------------------------------------------
# Настройки CORS
# ------------------------------------------------

CORS_ALLOWED_ORIGINS = [
    'http://176.124.212.138',  # Укажите здесь ваш домен
]
