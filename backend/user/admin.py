from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "date_joined", "email",
                    "first_name", "is_active", "is_staff", "last_login", "last_name", "username", "avatar")


admin.site.register(User, UserAdmin)
