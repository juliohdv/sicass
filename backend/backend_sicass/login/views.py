from django.db.models.fields import related
from django.db.models.fields.related import RelatedField
from django.http import request
from .models import TipoServicioSocial
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.decorators import api_view

# Create your views here.

class UsuarioVistas(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

class TipoServicioSocialVistas(viewsets.ModelViewSet):
    queryset =  TipoServicioSocial.objects.all()
    serializer_class = TipoServicioSocialSerializer

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

class EstudianteVistas(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

    @api_view(["POST"])
    def agregarEstudiante(request):
        data = JSONParser().parse(request)
        estudiante = Estudiante(estudiante = request.user)
        serializer = EstudianteSerializer(estudiante, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_404_BAD_REQUEST)
