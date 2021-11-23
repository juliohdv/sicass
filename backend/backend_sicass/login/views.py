from django.db.models import query
from .models import TipoServicioSocial
from rest_framework import views, viewsets
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from .serializers import *
import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token

# Create your views here.


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({'isAuthenticated': True})
    
@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    if username is None or password is None:
        return JsonResponse({'detail': 'Por favor, ingrese un usuario y contraseña.'}, status=400)
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({'detail': 'Credenciales no válidas, intente de nuevo.'}, status=400)
    login(request, user)
    tipo_usuario = user.__getattribute__('tipo_usuario')
    if tipo_usuario == 2:
        id_encargado_facultad = EncargadoFacultad.objects.get(user=user).codigo_encargado
        return JsonResponse({'detail': 'Te has logueado como: ', 'username': username, 'tipo_usuario': tipo_usuario, 'id_encargado_facultad':id_encargado_facultad})
    elif tipo_usuario == 3:
        id_encargado_escuela = EncargadoEscuela.objects.get(user=user).codigo_encargado
        return JsonResponse({'detail': 'Te has logueado como: ', 'username': username, 'tipo_usuario': tipo_usuario, 'id_encargado_escuela':id_encargado_escuela})
    else:
        return JsonResponse({'detail': 'Te has logueado como: ', 'username': username, 'tipo_usuario': tipo_usuario})


def logout_view(request):
    #if not request.user.is_authenticated:
    #    return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)
    logout(request)
    return JsonResponse({'detail': 'Hasta Luego!'})




def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})


class Usuarios(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer


class UltimoUsuario(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        ultimoUsuario = User.objects.order_by('id').last()
        queryset = User.objects.filter(id=ultimoUsuario.id)
        return queryset


class TipoServicioSocialVistas(viewsets.ModelViewSet):
    queryset = TipoServicioSocial.objects.all()
    serializer_class = TipoServicioSocialSerializer


class TipoServicioSocialPorCarreraVistas(viewsets.ModelViewSet):
    serializer_class = TipoServicioSocialSerializer

    def get_queryset(self):
        carrera = self.request.query_params.get('carrera')
        queryset = TipoServicioSocial.objects.all().filter(carrera_id=carrera)
        if carrera is not None:
            queryset = queryset.filter(carrera_id=carrera)
        return queryset


class FacultadVistas(viewsets.ModelViewSet):
    queryset = Facultad.objects.all()
    serializer_class = FacultadSerializer


class CarreraVistas(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer


class CarreraPorFacultadVistas(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer

    def get_queryset(self):
        facultad = self.request.query_params.get('facultad')
        queryset = Carrera.objects.all().filter(facultad_id=facultad)
        if facultad is not None:
            queryset = queryset.filter(facultad=facultad)
        return queryset


class CarreraPorId(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer

    def get_queryset(self):
        carrera = self.request.query_params.get('carrera')
        queryset = Carrera.objects.all().filter(codigo_carrera=carrera)
        if carrera is not None:
            queryset = queryset.filter(codigo_carrera=carrera)
        return queryset


class EstudiantesVistas(viewsets.ModelViewSet):
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()


class PermisosVistas(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermisosSerializer


class SolicitudesVista(viewsets.ModelViewSet):
    serializer_class = SolicitudSerializer
    queryset = Solicitud.objects.all()


class UltimaEntidadExternaVista(viewsets.ModelViewSet):
    serializer_class = EntidadExternaSerializer

    def get_queryset(self):
        ultimaEntidad = EntidadExterna.objects.order_by(
            'codigo_entidad').last()
        queryset = EntidadExterna.objects.filter(
            codigo_entidad=ultimaEntidad.codigo_entidad)
        return queryset


class PropuestasVista(viewsets.ModelViewSet):
    serializer_class = PropuestaSerializer
    queryset = Propuesta.objects.all()


class UsuariosGestionVista(viewsets.ModelViewSet):
    serializer_class = UsuariosGestionSerializer
    queryset = User.objects.all()


class ServicioSocialVista(viewsets.ModelViewSet):
    serializer_class = ServicioSocialSerializer
    queryset = ServicioSocial.objects.all()

class SolicitudUpsVista(viewsets.ModelViewSet):
    serializer_class = SolicitudUpsSerializer
    queryset = SolicitudUps.objects.all()

class TipoContenidoVistas(viewsets.ModelViewSet):
    queryset = ContentType.objects.all()
    serializer_class = TipoContenidoSerializer

class SolicitudUpsFiltroVistas(viewsets.ModelViewSet):
    serializer_class = SolicitudUpsSerializer
    def get_queryset(self):
        estudiante = self.request.query_params.get('estudiante')
        queryset = SolicitudUps.objects.all().filter(estudiante_id=estudiante)
        if estudiante is not None:
            queryset = queryset.filter(estudiante_id=estudiante)
        return queryset

class ServicioSocialPorCarreraTipo(viewsets.ModelViewSet):
    serializer_class = ServicioSocialSerializer
    def get_queryset(self):
        carnet = self.request.query_params.get('carnet') #Obtiene el parametro enviado
        estudiante = Estudiante.objects.get(carnet=carnet) #Obtiene el estudiante 
        carrera = estudiante.__getattribute__('carrera') #Obtiene la carrera del estudiante
        queryset = ServicioSocial.objects.filter(tipo_servicio_social__carrera=carrera) #Obtiene los SS por carrera
        return queryset

class SolicitudServicioVista(viewsets.ModelViewSet):
    serializer_class = SolicitudServicioSerializer
    queryset = SolicitudServicioSocial.objects.all()

class DocentesVista(viewsets.ModelViewSet):
    serializer_class = DocenteSerializer
    queryset = Docente.objects.all()

class EncargadoEscuelaVista(viewsets.ModelViewSet):
    serializer_class = EncargadoEscuelaSerializer
    queryset = EncargadoEscuela.objects.all()
    
class EscuelasVista(viewsets.ModelViewSet):
    serializer_class = EscuelaSerializer
    queryset = Escuela.objects.all()

class DocentesPorEncargadoFacultad(viewsets.ModelViewSet):
    serializer_class = DocenteSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoFacultad = EncargadoFacultad.objects.get(user=usuario)
        docente = encargadoFacultad.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        facultad = carrera.__getattribute__('facultad')
        queryset = Docente.objects.filter(escuela__carrera__facultad=facultad)
        return queryset
class EncargadosEscuelaPorFacultad(viewsets.ModelViewSet):
    serializer_class = EncargadoEscuelaSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoFacultad = EncargadoFacultad.objects.get(user=usuario)
        docente = encargadoFacultad.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        facultad = carrera.__getattribute__('facultad')
        queryset = EncargadoEscuela.objects.filter(docente_encargado__escuela__carrera__facultad=facultad)
        return queryset
class EscuelasPorEncargadoFacultad(viewsets.ModelViewSet):
    serializer_class = EscuelaSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoFacultad = EncargadoFacultad.objects.get(user=usuario)
        docente = encargadoFacultad.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        facultad = carrera.__getattribute__('facultad')
        queryset = Escuela.objects.filter(carrera__facultad=facultad)
        return queryset
        
class EscuelasPorFacultad(viewsets.ModelViewSet):
    serializer_class = EscuelaSerializer
    def get_queryset(self):
        id_facultad = self.request.query_params.get('facultad')
        facultad = Facultad.objects.get(codigo_facultad=id_facultad)
        queryset = Escuela.objects.filter(carrera__facultad=facultad)
        return queryset
class SolicitudServicioFiltroVistas(viewsets.ModelViewSet):
    serializer_class = SolicitudServicioSerializer
    def get_queryset(self):
        estudiante = self.request.query_params.get('estudiante')
        queryset = SolicitudServicioSocial.objects.all().filter(estudiante_id=estudiante)
        if estudiante is not None:
            queryset = queryset.filter(estudiante_id=estudiante)
        return queryset

""" class UltimaSolicitudServicioVista(viewsets.ModelViewSet):
    serializer_class = SolicitudServicioSerializer

    def get_queryset(self):
        estudiante = self.request.query_params.get('estudiante')
        queryset = SolicitudServicioSocial.objects.all().filter(estudiante_id=estudiante).order_by("codigo_solicitud_servicio")[1:]
        return queryset #Falta filtrar bien aun, que solo traiga la ultima solicitud por estudiante """
class PropuestaFiltroVista(viewsets.ModelViewSet):
    serializer_class = PropuestaSerializer
    def get_queryset(self):
        propuesta = self.request.query_params.get('estado')
        queryset = Propuesta.objects.all().filter(estado_propuesta=propuesta)
        if propuesta is not None:
            queryset = queryset.filter(estado_propuesta=propuesta)
        return queryset

class RegistroActividadVista(viewsets.ModelViewSet):
    serializer_class = ActividadSerializer
    queryset = RegistroActividad.objects.all()

class ActividadServicioVistas(viewsets.ModelViewSet):
    serializer_class = ActividadSerializer
    def get_queryset(self):
        proyecto = self.request.query_params.get('proyecto')
        queryset = RegistroActividad.objects.all().filter(proyecto_id=proyecto)
        if proyecto is not None:
            queryset = queryset.filter(proyecto_id=proyecto)
        return queryset


class TipoServicioFacultad(viewsets.ModelViewSet):
    serializer_class = TipoServicioSocialSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoFacultad = EncargadoFacultad.objects.get(user=usuario)
        docente = encargadoFacultad.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        facultad= carrera.__getattribute__('facultad')
        queryset = TipoServicioSocial.objects.filter(carrera__facultad=facultad)
        return queryset

        
class SolicitudUpsPorEncargadoEscuela(viewsets.ModelViewSet):
    serializer_class = SolicitudUpsSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoEscuela = EncargadoEscuela.objects.get(user=usuario)
        docente = encargadoEscuela.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        queryset = SolicitudUps.objects.filter(estudiante__carrera=carrera, estado_solicitud="En Proceso")
        return queryset

class SolicitudEstudiateASSPorEncargadoEscuela(viewsets.ModelViewSet):
    serializer_class = SolicitudServicioSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoEscuela = EncargadoEscuela.objects.get(user=usuario)
        docente = encargadoEscuela.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        queryset = SolicitudServicioSocial.objects.filter(estudiante__carrera=carrera)
        return queryset

class ServicioSocialPorPropuesta(viewsets.ModelViewSet):
    serializer_class = ServicioSocialSerializer
    def get_queryset(self):
        codigo_propuesta = self.request.query_params.get('codigo_propuesta')
        propuesta = Propuesta.objects.get(codigo_propuesta=codigo_propuesta)
        queryset = ServicioSocial.objects.filter(propuesta=propuesta)
        return queryset

class ProyectoPorEstudiante(viewsets.ModelViewSet):
    serializer_class = ProyectoSerializer
    def get_queryset(self):
        estudiante = self.request.query_params.get('estudiante')
        queryset = Proyecto.objects.filter(solicitud_servicio_id__estudiante_id=estudiante)
        return queryset

class ProyectoVista(viewsets.ModelViewSet):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()

class ProyectoActivos(viewsets.ModelViewSet):
    serializer_class = ProyectoSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoEscuela = EncargadoEscuela.objects.get(user=usuario)
        docente = encargadoEscuela.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        queryset = Proyecto.objects.filter(solicitud_servicio__estudiante__carrera=carrera)
        return queryset

class ProyectosPorEscuelaRevision(viewsets.ModelViewSet):
        serializer_class = ProyectoSerializer
        def get_queryset(self):
            usuario = User.objects.get(username=self.request.query_params.get('user'))
            encargado_escuela = EncargadoEscuela.objects.get(user=usuario)
            docente = encargado_escuela.__getattribute__('docente_encargado')
            escuela = docente.__getattribute__('escuela')
            carrera = escuela.__getattribute__('carrera')
            queryset = Proyecto.objects.filter(solicitud_servicio__estudiante__carrera=carrera, estado_proyecto="Revision")
            return queryset
class ServicioSocialConProyectos(viewsets.ModelViewSet):
        serializer_class =ProyectoSerializer
        def get_queryset(self):
            servicio_social_id = self.request.query_params.get('servicio_id')
            servicio = ServicioSocial.objects.get(codigo_servicio_social=servicio_social_id)
            solicitud_servicio = SolicitudServicioSocial.objects.get(servicio_social=servicio)
            proyectos = Proyecto.objects.filter(solicitud_servicio=solicitud_servicio)
            return proyectos

class SolicitudUpsRechazadas(viewsets.ModelViewSet):
    serializer_class = SolicitudUpsSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoEscuela = EncargadoEscuela.objects.get(user=usuario)
        docente = encargadoEscuela.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        queryset = SolicitudUps.objects.all().filter(estudiante__carrera__escuela=escuela, estado_solicitud="Rechazado")
        return queryset

class PropuestasPorFacultad(viewsets.ModelViewSet):
    serializer_class = PropuestaSerializer
    def get_queryset(self):
        nombre_usuario = self.request.query_params.get('user')
        usuario = User.objects.get(username=nombre_usuario)
        encargadoFacultad = EncargadoFacultad.objects.get(user=usuario)
        docente = encargadoFacultad.__getattribute__('docente_encargado')
        escuela = docente.__getattribute__('escuela')
        carrera = escuela.__getattribute__('carrera')
        facultad = carrera.__getattribute__('facultad')
        queryset = Propuesta.objects.all().filter(carrera__facultad=facultad)
        return queryset