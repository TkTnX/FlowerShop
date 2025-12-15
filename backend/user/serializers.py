from django.contrib.auth import get_user_model
from favoriteItem.serializers import FavoriteItemSerializer
from rest_framework import serializers
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    favorites = FavoriteItemSerializer(many=True, read_only=True)

    class Meta:
        model = User
        exclude = ['password', 'is_superuser']
        extra_kwargs = {
            'avatar': {'required': False}
        }
