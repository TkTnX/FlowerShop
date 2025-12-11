from django.urls import path
from .views import get_product_reviews, create_review, delete_review, get_three_reviews, get_user_reviews
urlpatterns = [
    path('user-reviews/', get_user_reviews, name="get user reviews"),
    path("<int:productId>/", get_product_reviews,
         name="get reviews by product id"),
    path("", get_three_reviews, name="get three reviews"),
    path("<int:productId>/create/", create_review, name="create review"),
    path("<int:review_id>/delete/", delete_review, name="delete review")
]
