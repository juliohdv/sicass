from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UsuarioVistas, TipoServicioSocialVistas, FacultadVistas, CarreraVistas,CarreraPorFacultadVistas, EstudianteVistas

router = routers.DefaultRouter()
router.register('users', UsuarioVistas)
router.register('tiposServicioSocial',TipoServicioSocialVistas)
router.register('facultades',FacultadVistas)
router.register('carreras', CarreraVistas)
router.register('carreraPorFacultad', CarreraPorFacultadVistas, basename='Carrera')
router.register('estudiante', EstudianteVistas)

urlpatterns = [
    path('', include(router.urls)),
]