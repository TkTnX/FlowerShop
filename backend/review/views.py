from django.shortcuts import render
from .models import Review, Product, User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from .serializers import ReviewSerializer
from django.db.models import Avg, Sum


@api_view(["GET"])
def get_product_reviews(request, productId):
    try:
        product = Product.objects.get(pk=productId)
        reviews = product.review_set.all()
    except Product.DoesNotExist:
        return Response({"error": "Отзывы не найдены!"}, status=404)

    return Response(list(reviews.values()))


@login_required
@api_view(['POST'])
def create_review(request):
    user_id = request.user.id
    product_id = request.GET.get('product_id')
    user = User.objects.get(id=user_id)
    product = Product.objects.get(id=product_id)

    review = Review.objects.create(
        text=request.GET.get('text'),
        rating=request.GET.get('rating'),
        user=user,
        product=product
    )

    # ПЕРЕСЧЁТ РЕЙТИНГА

    product.rating = product.review_set.aggregate(avg=Avg('rating'))[
        'avg']
    product.save()

    serializer = ReviewSerializer(review)
    return Response(serializer.data)


# @login_required
@api_view(["DELETE"])
def delete_review(request, review_id):
    # user_id = request.user.id
    user_id = 1
    user = User.objects.get(id=user_id)
    review = Review.objects.get(id=review_id)
    if review.user.id != user.id:
        return Response({"message": "Невозможно удалить отзыв"}, status=401)

    review.delete()
    return Response({"message": "Отзыв удалён!"}, status=201)
