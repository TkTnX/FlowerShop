from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    phone = models.TextField(
        max_length=12, help_text="Номер телефона пользователя", null=True, blank=True)
    gender = models.TextField(
        help_text="Пол пользователя", null=True, blank=True),
    address = models.TextField(
        max_length=100, help_text="Адрес", null=True, blank=True)
