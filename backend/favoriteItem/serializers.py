from rest_framework import serializers
from .models import FavoriteItem


class FavoriteItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = FavoriteItem
        fields = "__all__"

    def get_product(self, obj):
        from product.serializers import ProductSerializer
        return ProductSerializer(obj.product).data
