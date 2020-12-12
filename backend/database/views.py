from django.shortcuts import render
from django.http import HttpResponse
from .models import City, Temperature
from .api.serializers import CitySerializer
import requests
from decimal import *
import time 
import datetime 
import json
# Create your views here.

def ViewCity(request):
    cname = request.GET.get("city")
    if(cname == None):
        city = City.objects.all()
        serializers = CitySerializer(city, many=True)
        return HttpResponse(serializers.data)
    print(cname)
    try:
            cityname = City.objects.filter(Cityname=cname).get()
    except City.DoesNotExist:
        return Response({
            "Message": "Wrong City Name"
        })
    serializers = CitySerializer(cityname, many=True)
    return HttpResponse(serializers.data)

def AddCity(request):
    cname = request.GET.get("city")
    lon = request.GET.get("lon")
    lat = request.GET.get("lat")

    newcity = City.objects.create(Latitude = lat, Longitude= lon, Cityname=cname, Country="India")
    newcity.save()
    return HttpResponse("City added")

def AddTemptoCity(request):
    cname = request.GET.get("cities")
    cities = cname.split(",")

    date = request.GET.get("date")
    api_key = "0310bcef4565267c26ad649582948b14"

    datetimefield = datetime.datetime.strptime(date, 
                                             "%d/%m/%Y")

    timestamp = time.mktime(datetimefield.timetuple())

    for cname in cities:

        Fromtime = datetimefield
        city = City.objects.get(Cityname=cname)

        URL = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat="+ str(city.Latitude) +"&lon=" + str(city.Longitude) + "&dt=" + str(int(timestamp)) + "&appid=" + api_key 
        print(URL)
        response = requests.get(URL)

        tempobj = json.loads(response.content)
        i = 0 
        duration = datetime.timedelta(hours=2)

        while(i<23):
            maxtemp = 0
            if(int(tempobj["hourly"][i]["temp"]) > int(tempobj["hourly"][i+1]["temp"])):
                maxtemp = tempobj["hourly"][i]["temp"]
                dt_object = datetime.datetime.utcfromtimestamp(tempobj["hourly"][i]["dt"])
            else:
                maxtemp = tempobj["hourly"][i+1]["temp"]
                dt_object = datetime.datetime.utcfromtimestamp(tempobj["hourly"][i+1]["dt"])

            tempfield = Temperature.objects.create(Cid = city.Cid,Date = Fromtime.date(), MaxTemperature = Decimal(maxtemp), DateTime = dt_object, FromTime = Fromtime, ToTime = Fromtime+duration) 
            tempfield.save()

            Fromtime += duration


            i+=2
 

    return HttpResponse("response done")



# 28.5355° N, 77.3910° E Noida
# 26.4499° N, 80.3319° E Kanpur
# 18.5204° N, 73.8567° E Pune
# 19.0760° N, 72.8777° E Mumbai
# 26.9124° N, 75.7873° E Jaipur
# 12.9716° N, 77.5946° E Banglore
# 31.1048° N, 77.1734° E Shimla
# 24.8170° N, 93.9368° E Imphal 
# 30.7333° N, 76.7794° E chandigarh 
# 17.3850° N, 78.4867° E hyderabad

