from django.urls import path
from .views import get_product_reviews, create_review, delete_review
urlpatterns = [
    path("<int:productId>/", get_product_reviews,
         name="get reviews by product id"),
    path("", create_review, name="create review"),
    path("<int:review_id>/delete/", delete_review, name="delete review")
]
