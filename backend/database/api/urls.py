from django.urls import path
from .views import ViewCity,TempView
import uuid
urlpatterns = [
    path('city/', ViewCity.as_view(), name='city'),
    path('temp/', TempView.as_view(), name="temp"),
]
