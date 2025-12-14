from .models import Review, Product, User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ReviewSerializer
from django.db.models import Avg


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_user_reviews(request):
    user_id = request.user.id

    reviews = Review.objects.filter(user=user_id)

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_three_reviews(request):
    try:
        reviews = Review.objects.order_by('-created_at')[:4]
    except Product.DoesNotExist:
        return Response({"error": "Отзывы не найдены!"}, status=404)

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_product_reviews(request, productId):
    try:
        product = Product.objects.get(pk=productId)
        reviews = product.review_set.order_by('-created_at')
    except Product.DoesNotExist:
        return Response({"error": "Отзывы не найдены!"}, status=404)

    return Response(list(reviews.values()))


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_review(request, productId):
    data = request.data
    user_id = request.user.id
    user = User.objects.get(id=user_id)
    product = Product.objects.get(id=productId)

    review = Review.objects.create(
        text=data.get('text'),
        rating=data.get('rating'),
        user=user,
        product=product
    )

    # ПЕРЕСЧЁТ РЕЙТИНГА

    product.rating = product.reviews.aggregate(avg=Avg('rating'))[
        'avg']
    product.save()

    serializer = ReviewSerializer(review)
    return Response(serializer.data)


# @login_required
@api_view(["DELETE"])
def delete_review(request, review_id):
    user_id = request.user.id
    user = User.objects.get(id=user_id)
    review = Review.objects.get(id=review_id)
    if review.user.id != user.id:
        return Response({"message": "Невозможно удалить отзыв"}, status=401)

    review.delete()
    return Response({"message": "Отзыв удалён!"}, status=201)
