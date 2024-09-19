from .celery import app as celery_app


__all__ = ("celery_app",)


def ready(self):
    import signals
