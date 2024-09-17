from django.apps import AppConfig


class CopyreelsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'copyreels'

    def ready(self):
        import copyreels.signals  # noqa
