from django.urls import path
from .views import get_user_cart
urlpatterns = [
    path('', get_user_cart, name="Get user cart")
]