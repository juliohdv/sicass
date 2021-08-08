from .models import TipoServicioSocial
from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
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