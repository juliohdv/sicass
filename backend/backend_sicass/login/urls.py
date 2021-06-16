from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UsuarioVistas

router = routers.DefaultRouter()
router.register('users', UsuarioVistas)

urlpatterns = [
    path('', include(router.urls)),
]