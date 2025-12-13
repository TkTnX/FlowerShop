from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Cart(models.Model):
    user = models.ForeignKey(User, related_name="carts",
                             on_delete=models.CASCADE)
    total_price = models.IntegerField(name="totalPrice", default=0)
