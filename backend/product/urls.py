from django.urls import path
from .views import get_products, get_product
urlpatterns = [
    path("", get_products, name="products"),
    path("<int:pk>/", get_product, name="product"),
]
