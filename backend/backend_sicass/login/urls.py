from django.db.models import base
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from rest_framework.fields import BuiltinSignatureError
from .views import *
from . import views

router = routers.DefaultRouter()
router.register('crearUsuario', Usuarios)  #Crea un usuario nuevo
router.register('ultimoUsuario', UltimoUsuario, basename='User')  #Retorna el ultimo usuario creado
router.register('tiposServicioSocial',TipoServicioSocialVistas) #Retorna lista de tipos de servicio social
router.register('tiposServicioSocialPorCarrera',TipoServicioSocialPorCarreraVistas, basename='TipoServicioSocial') #Retorna lista de tipos de servicio social por carrera
router.register('facultades',FacultadVistas) #Retorna lista de facultades
router.register('carreras', CarreraVistas) #Retorna lista de carreras
router.register('carreraPorFacultad', CarreraPorFacultadVistas, basename='Carrera') #Retorna lista de carreras por facultad
router.register('estudiantes', EstudiantesVistas, basename='Estudiante') #Crea un estudiante
router.register('solicitudes', SolicitudesVista, basename='Solicitud') #Crea una solicitud nueva
router.register('entidadExterna',  UltimaEntidadExternaVista, basename='EntidadExterna') #Crea una entidad externa
router.register('ultimaEntidadExterna',  UltimaEntidadExternaVista, basename='EntidadExterna') #Retorna la ultima entidad externa guardada
router.register('permisos', PermisosVistas) #Retorna la gestion de roles y privilegios
router.register('carreraPorId',CarreraPorId, basename='Carrera')  #Retorna una carrea filtrada por codigo de carrera
router.register('propuestas', PropuestasVista, basename='Propuesta') #Crea una propuesta nueva
router.register('usuarios', UsuariosGestionVista) #Retorna la gestion de roles y privilegios
router.register('servicioSocial', ServicioSocialVista) #Retorna la gestion de roles y privilegios
router.register('registroUps', SolicitudUpsVista) #Retorna la gestion de roles y privilegios
router.register('tipoContenido', TipoContenidoVistas) #Retorna el tipo de contenido de roles y privilegios
router.register('registroUpsEstudiante', SolicitudUpsFiltroVistas, basename='Estudiante') #Retorna lista de carreras por facultad

urlpatterns = [
    path('', include(router.urls)),
    path('csrf/',views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
]