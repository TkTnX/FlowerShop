from django.urls import path
from .views import handle_fav
urlpatterns = [
    path('<int:productId>/', handle_fav, name="Add/Delete favorite item")
]