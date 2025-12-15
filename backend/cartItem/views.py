from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from .serializers import CartItemSerializer
from product.models import Product
from django.shortcuts import get_object_or_404
from cart.models import Cart
from cart.serializers import CartSerializer


@permission_classes(IsAuthenticated)
@api_view(['POST'])
def add_to_cart(request):
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    product_id = request.data.get('productId')
    product = get_object_or_404(Product, pk=int(product_id))

    if cart.cartItems.filter(product=product).exists():
        found_item = cart.cartItems.get(product=product)
        found_item.quantity += 1
        found_item.save()
        serializer = CartItemSerializer(found_item)
        cart.totalPrice += found_item.product.price
        cart.save()
        return Response(serializer.data)

    cart_item = CartItem.objects.create(
        cart=cart,
        product=product
    )

    cart.totalPrice += cart_item.product.price * cart_item.quantity
    cart.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data)


@permission_classes(IsAuthenticated)
@api_view(['PATCH'])
def change_quantity(request):
    data = request.data
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    print(data)
    cart_item = CartItem.objects.get(id=data.get("cartItemId"))
    if data.get("action") == "plus":
        cart_item.quantity += 1
        cart.totalPrice += cart_item.product.price
    else:
        cart_item.quantity -= 1
        cart.totalPrice -= cart_item.product.price
    cart_item.save()
    cart.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data)


@permission_classes(IsAuthenticated)
@api_view(['DELETE'])
def delete_cart_item(request, cartItemId):
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    cart_item = get_object_or_404(CartItem, id=cartItemId)

    cart.totalPrice -= cart_item.quantity * cart_item.product.price

    cart_item.delete()
    cart.save()
    return Response("Success")


@permission_classes(IsAuthenticated)
@api_view(['DELETE'])
def clear_cart(request):
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    cart_items = CartItem.objects.filter(cart=cart)
    cart_items.delete()
    cart.totalPrice = 0
    cart.save()

    return Response('Success')
