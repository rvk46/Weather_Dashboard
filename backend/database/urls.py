from django.urls import path
from .views import ViewCity, AddTemptoCity, AddCity
import uuid
app_name = 'database'

urlpatterns = [
    path('city/', ViewCity, name='city'),
    path('addtemp/', AddTemptoCity, name="addtemp"),
    path('addcity/', AddCity, name="addcity"),
]
