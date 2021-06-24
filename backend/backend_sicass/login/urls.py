from django.db.models import base
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('users', UsuarioVistas)  #Crea un usuario
router.register('tiposServicioSocial',TipoServicioSocialVistas) #Retorna lista de tipos de servicio social
router.register('tiposServicioSocialPorCarrera',TipoServicioSocialPorCarreraVistas, basename='TipoServicioSocial') #Retorna lista de tipos de servicio social por carrera
router.register('facultades',FacultadVistas) #Retorna lista de facultades
router.register('carreras', CarreraVistas) #Retorna lista de carreras
router.register('carreraPorFacultad', CarreraPorFacultadVistas, basename='Carrera') #Retorna lista de carreras por facultad
router.register('estudiantes', EstudiantesVistas, basename='Estudiante') #Crea un estudiante
router.register('solicitudes', SolicitudesVista, basename='Solicitud') #Crea una solicitud nueva
router.register('entidadExterna',  UltimaEntidadExternaVista, basename='EntidadExterna') #Crea una entidad externa
router.register('ultimaEntidadExterna',  UltimaEntidadExternaVista, basename='EntidadExterna') #Retorna la ultima entidad externa guardada

urlpatterns = [
    path('', include(router.urls)),
]