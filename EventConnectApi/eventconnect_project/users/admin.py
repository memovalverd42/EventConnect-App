from django.contrib import admin
from .models import User


class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        # 'first_name',
        # 'last_name',
        'is_email_verified',
        'is_staff',
        'is_active',
    )
    list_filter = ('email', 'is_staff', 'is_email_verified',)
    fieldsets = (
        (None, {'fields': (
            'first_name',
            'last_name',
            'password',
            'groups'
        )}),
        ('Permissions', {'fields': (
            'user_permissions',
            'is_email_verified',
            'is_staff',
            'is_active',
            'is_superuser'
        )}),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
