from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from product.models import Product
User = get_user_model()


class Review(models.Model):
    text = models.TextField(max_length=1000, help_text="Введите отзыв")
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(
        5)], help_text="Рейтинг должен быть от 1 до 5", default=0)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"Отзыв на {self.product.title} от {self.user.first_name}"