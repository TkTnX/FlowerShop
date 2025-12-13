from .models import Cart
from .serializers import CartSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_user_cart(request):
    cart = get_object_or_404(Cart, user=request.user)

    serializer = CartSerializer(cart)
    return Response(serializer.data)
