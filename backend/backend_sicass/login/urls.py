from django.db.models import base
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('users', UsuarioVistas)
router.register('tiposServicioSocial',TipoServicioSocialVistas)
router.register('tiposServicioSocialPorCarrera',TipoServicioSocialPorCarreraVistas, basename='TipoServicioSocial')
router.register('facultades',FacultadVistas)
router.register('carreras', CarreraVistas)
router.register('carreraPorFacultad', CarreraPorFacultadVistas, basename='Carrera')
router.register('estudiantes', EstudiantesVistas, basename='Estudiante')
router.register('solicitudes', SolicitudesVista, basename='Solicitud')

urlpatterns = [
    path('', include(router.urls)),
]