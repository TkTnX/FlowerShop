from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Product(models.Model):
    id = models.UUIDField(primary_key=True),
    title = models.CharField(max_length=200, help_text="Введите название товара")
    price = models.IntegerField()
    description = models.TextField(max_length=1000, help_text="Введите описание товара")
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], help_text="Рейтинг должен быть от 1 до 5", default=0)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return f"Image for {self.product.title}"