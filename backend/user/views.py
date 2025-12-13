from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from .serializers import UserSerializer
from cart.services import create_user_cart

User = get_user_model()


@api_view(["POST"])
def register(request):
    data = request.data
    try:
        newUser = User.objects.create_user(
            username=data.get('username'),
            email=data.get('email'),
            password=data.get('password')
        )
    except Exception as e:
        return Response({"error": str(e)}, status=404)

    create_user_cart(newUser)
    token = Token.objects.create(user=newUser)

    return Response({"token": token.key})


@api_view(["POST"])
def login(request):
    data = request.data

    user = authenticate(username=data.get("username"),
                        password=data.get("password"))
    if not user:
        return JsonResponse({"error": "Неверные данные"}, status=400)

    token = Token.objects.get_or_create(user=user)
    return Response({"token": token[0].key})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return JsonResponse({"user": UserSerializer(user).data})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def edit(request):
    data = request.data
    user = request.user
    print(data)
    serializer = UserSerializer(user, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
