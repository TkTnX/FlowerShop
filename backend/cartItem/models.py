from django.db import models
from product.models import Product
from cart.models import Cart
# Create your models here.
class CartItem(models.Model):
    product = models.ForeignKey(Product,  on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    cart = models.ForeignKey(Cart, related_name="cartItems", on_delete=models.CASCADE)