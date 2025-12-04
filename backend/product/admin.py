from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "price", "description", "rating", "images")


admin.site.register(Product, ProductAdmin)
