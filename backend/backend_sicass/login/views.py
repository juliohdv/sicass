from .models import TipoServicioSocial
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UsuarioSerializer, TipoServicioSocialSerializer

# Create your views here.

class UsuarioVistas(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

class TipoServicioSocialVistas(viewsets.ModelViewSet):
    queryset =  TipoServicioSocial.objects.all()
    serializer_class = TipoServicioSocialSerializer
