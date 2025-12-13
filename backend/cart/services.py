from .models import Cart
def create_user_cart(user):
    cart = Cart.objects.get_or_create(user=user)
    return cart