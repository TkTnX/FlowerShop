from django.contrib import admin
from .models import CartItem


class CartItemModel(admin.ModelAdmin):
    list_display = ("id", "product", "quantity", "cart")


admin.site.register(CartItem, CartItemModel)
