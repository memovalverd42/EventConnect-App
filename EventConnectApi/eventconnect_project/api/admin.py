from django.contrib import admin
from .models import Event

# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'location', 'created_by', 'assistants_count')
    search_fields = ('name', 'created_by__username')
    list_filter = ('created', 'date')
    date_hierarchy = 'date'
    ordering = ('-date',)