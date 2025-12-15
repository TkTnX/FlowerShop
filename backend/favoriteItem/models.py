from django.db import models
from product.models import Product
from user.models import User
class FavoriteItem(models.Model):
    product = models.ForeignKey(Product, related_name="favorites", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="favorites", on_delete=models.CASCADE)