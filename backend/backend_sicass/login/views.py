from django.db.models.fields import related
from django.db.models.fields.related import RelatedField
from django.http import request
from .models import TipoServicioSocial
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from .serializers import *
from rest_framework.decorators import api_view

# Create your views here.

class UsuarioVistas(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

class TipoServicioSocialVistas(viewsets.ModelViewSet):
    queryset =  TipoServicioSocial.objects.all()
    serializer_class = TipoServicioSocialSerializer

class TipoServicioSocialPorCarreraVistas(viewsets.ModelViewSet):
    serializer_class = TipoServicioSocialSerializer
    def get_queryset(self):
        carrera = self.request.query_params.get('carrera')
        queryset = TipoServicioSocial.objects.all().filter(carrera_id=carrera)
        if carrera is not None:
            queryset = queryset.filter(carrera = carrera)
        return queryset

class FacultadVistas(viewsets.ModelViewSet):
    queryset = Facultad.objects.all()
    serializer_class = FacultadSerializer

class CarreraVistas(viewsets.ModelViewSet) :
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer

class CarreraPorFacultadVistas(viewsets.ModelViewSet) :
    serializer_class = CarreraSerializer
    def get_queryset(self):
        facultad = self.request.query_params.get('facultad')
        queryset = Carrera.objects.all().filter(facultad_id=facultad)
        if facultad is not None:
            queryset = queryset.filter(facultad = facultad)
        return queryset
class EstudiantesVistas(viewsets.ModelViewSet):
    serializer_class = EstudianteSerializer
    
class PermisosVistas(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermisosSerializer

class SolicitudesVista(viewsets.ModelViewSet):
    serializer_class = SolicitudSerializer
    queryset = Solicitud.objects.all()