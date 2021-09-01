from .models import TipoServicioSocial
from rest_framework import viewsets
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
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)
    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.', 'username': username, 'tipo_usuario': user.__getattribute__('tipo_usuario')})
    


def logout_view(request):
    #if not request.user.is_authenticated:
    #    return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)
    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})




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
            queryset = queryset.filter(carrera=carrera)
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
        carnet = self.request.query_params.get('carnet')
        estudiante = Estudiante.objects.filter(carnet=carnet)[0]
        carrera = estudiante.__getattribute__('carrera')
        tipos_servicios = TipoServicioSocial.objects.filter(carrera=carrera)[0]
        queryset = ServicioSocial.objects.filter(tipo_servicio_social_id=tipos_servicios.__getattribute__('condigo_tipo_servicio_social'))
        return queryset

class SolicitudServicioVista(viewsets.ModelViewSet):
    serializer_class = SolicitudServicioSerializer
    queryset = SolicitudServicioSocial.objects.all()

class SolicitudServicioFiltroVistas(viewsets.ModelViewSet):
    serializer_class = SolicitudServicioSerializer

    def get_queryset(self):
        estudiante = self.request.query_params.get('estudiante')
        queryset = SolicitudServicioSocial.objects.all().filter(estudiante_id=estudiante)
        if estudiante is not None:
            queryset = queryset.filter(estudiante_id=estudiante)
        return queryset 

class PropuestaFiltroVista(viewsets.ModelViewSet):
    serializer_class = PropuestaSerializer

    def get_queryset(self):
        propuesta = self.request.query_params.get('estado')
        queryset = Propuesta.objects.all().filter(estado_propuesta=propuesta)
        if propuesta is not None:
            queryset = queryset.filter(estado_propuesta=propuesta)
        return queryset
