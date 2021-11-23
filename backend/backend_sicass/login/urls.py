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
router.register('usuarios', UsuariosGestionVista) #Gestion de usuarios
router.register('servicioSocial', ServicioSocialVista) #Gestion de servicios sociales
router.register('registroUps', SolicitudUpsVista) #Crear registro del estudiante UPS
router.register('tipoContenido', TipoContenidoVistas) #Retorna el tipo de contenido de roles y privilegios
router.register('registroUpsEstudiante', SolicitudUpsFiltroVistas, basename='Estudiante') #Retorna la solicitud de registro por UPS
router.register('servicioSocialPorCarreraTipo', ServicioSocialPorCarreraTipo, basename="ServicioSocial") #Retorna el servicio por carrera
router.register('solicitudServicio', SolicitudServicioVista) #Para actualizar la cantidad de estudiantes
router.register('solicitudUpsVista', SolicitudUpsVista) #Retorna las solicitudes de registro a la ups de estudiantes
router.register('docentes', DocentesVista, basename='Docentes') #Retorna todos los docentes
router.register('encargadoEscuela', EncargadoEscuelaVista, basename='EncargadoEscuela')
router.register('docentesPorEncargadoFacultad', DocentesPorEncargadoFacultad, basename='DocentesPorEncargadoFacultad')
router.register('escuelasPorFacultad',EscuelasPorFacultad, basename="EscuelasPorFacultad")
router.register('escuelasPorEncargadoFacultad',EscuelasPorEncargadoFacultad, basename="EscuelasPorEncargadoFacultad")
router.register('encargadosEscuelaPorFacultad',EncargadosEscuelaPorFacultad, basename="EncargadosEscuelaPorFacultad")


router.register('solicitudServicioEstudiante', SolicitudServicioFiltroVistas, basename="Servicio") #Regresa las solicitudes de SS de los estudiantes
""" router.register('ultimaSolicitudServicio', UltimaSolicitudServicioVista, basename="UltimaSolicitud")  """#Regresa las ultima solicitud de SS de un estudiante
router.register('actividades', RegistroActividadVista, basename="Actividades") #Retorna las actividades realizadas
router.register('actividadesEstudiante', ActividadServicioVistas, basename="ActividadesEstudiante") #Retorna las actividades de un estudiante
router.register('tipoServicioFacultad', TipoServicioFacultad, basename="tipoServicioFacultad") 
router.register('solicitudUpsPorEncargadoDeEscuela',SolicitudUpsPorEncargadoEscuela, basename="SolicitudUpsPorEncargadoDeEscuela")
router.register('solicitudEstudiateASSPorEncargadoEscuela', SolicitudEstudiateASSPorEncargadoEscuela, basename="SolicitudEstudiateASSPorEncargadoEscuela")
router.register('propuestaEstado', PropuestaFiltroVista, basename="PropuestaEstado") 
router.register('servicioSocialPorPropuesta', ServicioSocialPorPropuesta, basename="ServicioSocialPorPropuesta")
router.register('proyectoPorEstudiante', ProyectoPorEstudiante, basename="proyectoPorEstudiante")
router.register('proyecto', ProyectoVista, basename="proyecto")
router.register('proyectoActivos', ProyectoActivos, basename="proyectoActivos")
router.register('proyectosPorEscuelaRevision', ProyectosPorEscuelaRevision, basename="proyectoPorEscuelaRevision")
router.register('servicioSocialConProyectos', ServicioSocialConProyectos, basename="ServicioSocialConProyectos")
router.register('SolicitudUpsRechazadas',SolicitudUpsRechazadas, basename='SolicitudUpsRechazadas')
router.register('PropuestasPorFacultad', PropuestasPorFacultad, basename='PropuestasPorFacultad')
router.register('SolicitudesPorFacultad', SolicitudesPorFacultad, basename='SolicitudesPorFacultad')


urlpatterns = [
    path('', include(router.urls)),
    path('csrf/',views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
]