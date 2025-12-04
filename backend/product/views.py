from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()

    if products is None:
        return Response({"error": "Продукты не найдены!"}, status=404)

    return Response(list(products.values()))


@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": "Продукт не найден!"}, status=404)

    serializer = ProductSerializer(product)
    return Response(serializer.data)


