from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user.serializers import UserSerializer
from product.models import Product
from .models import FavoriteItem


@permission_classes(IsAuthenticated)
@api_view(['POST'])
def handle_fav(request, productId):
    user = request.user
    product = get_object_or_404(Product, id=productId)
    user_serializer = UserSerializer(user)

    if user.favorites.filter(product=product).exists():
        fav_item = get_object_or_404(FavoriteItem, product=product)
        fav_item.delete()
        user.save()
    else:
        fav_item = FavoriteItem.objects.create(
            product=product,
            user=user
        )

    return Response(user_serializer.data)
