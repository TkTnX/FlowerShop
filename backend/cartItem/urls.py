from django.urls import path
from .views import add_to_cart, change_quantity, delete_cart_item, clear_cart
urlpatterns = [
    path('add/', add_to_cart, name="add to cart"),
    path('quantity/', change_quantity, name="chage quantity"),
    path('delete/<int:cartItemId>/', delete_cart_item, name="delete cart item"),
    path('clear/', clear_cart, name="clear cart")
]
