from rest_framework import serializers
from .models import Cart
from cartItem.serializers import CartItemSerializer


class CartSerializer(serializers.ModelSerializer):
    cartItems = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = "__all__"
