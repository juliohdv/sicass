from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UsuarioVistas, TipoServicioSocialVistas

router = routers.DefaultRouter()
router.register('users', UsuarioVistas)
router.register('tiposServicioSocial',TipoServicioSocialVistas)

urlpatterns = [
    path('', include(router.urls)),
]