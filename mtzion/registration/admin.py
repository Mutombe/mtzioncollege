from django.contrib import admin
from .models import Registration, Branch, UserProfile, Student, Grade


class AdminRegistrationOverview(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "status",
        "created_at",
        "updated_at",
        "admin_notes",
    )
    search_fields = (
        "user",
        "status",
    )
    ordering = ("status",)
    list_filter = (
        "user",
        "status",
    )

class AdminBranchOverview(admin.ModelAdmin):
    list_display = (
        "name",
        "location",
    )
    search_fields = (
        "name",
        "location",
    )
    ordering = ("name",)
    list_filter = (
        "name",
        "location",
    )

class AdminGradeOverview(admin.ModelAdmin):
    list_display = (
        "name",
        "branch",
    )
    search_fields = (
        "name",
        "branch",
    )
    ordering = ("name",)
    list_filter = (
        "name",
        "branch",
    )

class AdminUserProfileOverview(admin.ModelAdmin):
    list_display = (
        "user",
    )
    search_fields = (
        "name",
    )
    ordering = ("user",)
    list_filter = (
        "user",
    )


admin.site.register(Registration, AdminRegistrationOverview)
admin.site.register(Grade, AdminGradeOverview)
admin.site.register(Branch, AdminBranchOverview)
admin.site.register(UserProfile, AdminUserProfileOverview)


