from django.db import models
import uuid
# Create your models here.


class City(models.Model):
    Cid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Longitude = models.DecimalField(max_digits=5, decimal_places=2)
    Latitude = models.DecimalField(max_digits=5, decimal_places=2)
    Cityname = models.CharField(max_length=20, blank=False, unique=True)
    Country = models.CharField(max_length=20, null=False, blank=False)
    def __str__(self):
        return self.Cityname


class Temperature(models.Model):
    Tid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Cid = models.UUIDField(default=uuid.uuid4)
    MaxTemperature = models.DecimalField(max_digits=10, decimal_places=1)
    FromTime = models.DateTimeField()
    ToTime = models.DateTimeField()
    DateTime = models.DateTimeField()
    Date = models.DateField()

    def __str__(self):
        return str(self.Cid) + str(self.FromTime)

