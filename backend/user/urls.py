from django.urls import path
from .views import register, login, me

urlpatterns = [
    path("auth/register/", register, name="Register user"),
    path("auth/login/", login, name="Login user"),
    path("me/", me, name="get me")
]
