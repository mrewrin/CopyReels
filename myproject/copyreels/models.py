from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class CustomUserManager(UserManager):
    pass  # Используем стандартные методы UserManager

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.username


class VideoProcessResult(models.Model):
    url = models.URLField()
    user_info = models.CharField(max_length=255, null=True, blank=True)
    transcribation = models.TextField()
    rewriting = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
