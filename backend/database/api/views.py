from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from ..models import City, Temperature
# import shows.models as ShowModel
from .serializers import CitySerializer, TemperatureSerializer
import json
from datetime import datetime


class ViewCity(APIView):

    def get(self, request, format=None):
        cname = request.GET.get("city")
        if(cname == None):
            city = City.objects.all()
            serializers = CitySerializer(city, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        print(cname)
        try:
                cityname = City.objects.filter(Cityname=cname).get()
        except City.DoesNotExist:
            return Response({
                "Message": "Wrong City Name"
            })
        serializers = CitySerializer(cityname, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

#TEMPCODE


class TempView(APIView):
    def get(self, request, format=None):
        try:
            cname = request.query_params["city"]
            city = City.objects.filter(Cityname=cname).get()
            
        except:
            response = {
                'Message': 'Enter city'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


        try:
            All = request.query_params["all"]
            if(All == "true"):
                temp = Temperature.objects.filter(Cid= city.Cid) 
                serializers = TemperatureSerializer(temp, many=True)
                return Response(serializers.data, status=status.HTTP_200_OK)
            else:
                response = {
                        'Message': 'No data to show'
                    }
                return Response(response, status=status.HTTP_204_NO_CONTENT)
        except:
            try:
                date = request.query_params["date"]
                datetimefield = datetime.strptime(date, 
                                                "%d/%m/%Y")
                print(datetimefield)
                
            except:
                try:
                   
                    fromdate = request.query_params["from"]
                    fromdatefield = datetime.strptime(fromdate, 
                                                "%d/%m/%Y")

                    todate = request.query_params["to"] 
                    todatefield = datetime.strptime(todate, 
                                                "%d/%m/%Y") 
                    temp = Temperature.objects.filter( Cid= city.Cid,Date__range=(fromdatefield,todatefield))
                    serializers = TemperatureSerializer(temp, many=True)
                    return Response(serializers.data, status=status.HTTP_200_OK)
                except:
                    response = {
                        'Message': 'Enter Invalid date'
                    }
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)


                response = {
                    'Message': 'Enter valid date'
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

            try:
                temp = Temperature.objects.filter(Cid= city.Cid,Date = datetimefield) 
                serializers = TemperatureSerializer(temp, many=True)
                return Response(serializers.data, status=status.HTTP_200_OK)

                
            except:
                response = {
                    'Message': 'No data to show'
                }
                return Response(response, status=status.HTTP_204_NO_CONTENT)
