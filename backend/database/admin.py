from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import City, Temperature


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    readonly_fields = (['Cid'])


@admin.register(Temperature)
class TemperatureAdmin(admin.ModelAdmin):
    pass