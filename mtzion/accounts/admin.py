from django.contrib import admin
from .models import CustomUser


class AdminUserOverview(admin.ModelAdmin):
    list_display = (
        "id",
        "is_admin",
    )
    search_fields = (
        "is_admin",
    )
    ordering = ("is_admin",)
    list_filter = (
        "is_admin",
    )

admin.site.register(CustomUser, AdminUserOverview)