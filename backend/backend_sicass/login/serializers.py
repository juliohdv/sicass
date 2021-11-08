from typing import SupportsRound
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'tipo_usuario']
        extra_kwargs = {'password': {'write_only':True, 'required':True}} #Con esto hacemos que la contraseña no sea visible en las peticiones y que sea requerida en las creaciones

    def create(self, validated_data):
        usuario = User.objects.create_user(**validated_data)
        return usuario
    

    
class FacultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facultad
        fields = ['codigo_facultad', 'nombre_facultad']

class CarreraSerializer(serializers.ModelSerializer):
    facultad_detalle = FacultadSerializer(source='facultad', read_only=True)
    class Meta:
        model = Carrera
        fields = "__all__"

class TipoServicioSocialSerializer(serializers.ModelSerializer):
    carrera_detalle = CarreraSerializer(source = 'carrera',read_only=True)
    class Meta:
        model = TipoServicioSocial
        fields = "__all__"

class EstudianteSerializer(serializers.ModelSerializer):
    carrera_detalle = CarreraSerializer(source = 'carrera',read_only=True)
    class Meta:
        model = Estudiante
        fields = "__all__"
    
    def create(self, validated_data):
        estudiante = Estudiante.objects.create(**validated_data)
        return estudiante

class PermisosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"
    def create(self, validated_data):
        permiso = Permission.objects.create(**validated_data)
        return permiso

class EntidadExternaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntidadExterna
        fields = ['codigo_entidad','nombre_entidad','direccion_entidad','correo_entidad','telefono_entidad','clasificacion_entidad']
    def create(self, validate_data):
        entidad = EntidadExterna.objects.create(**validate_data)
        return entidad

class SolicitudSerializer(serializers.ModelSerializer):
    entidad_externa_detalle =  EntidadExternaSerializer(source = 'entidad_externa', read_only=True)
    carrera_detalle = CarreraSerializer(source = 'carrera', read_only=True)
    tipo_servicio_social_detalle = TipoServicioSocialSerializer(source = 'tipo_servicio_social', read_only=True)
    class Meta:
        model = Solicitud
        fields = "__all__"
    def create(self, validated_data):
        solicitud = Solicitud.objects.create(**validated_data)
        return solicitud

class PropuestaSerializer(serializers.ModelSerializer):
    entidad_externa_detalle =  EntidadExternaSerializer(source = 'entidad_externa', read_only=True)
    carrera_detalle = CarreraSerializer(source = 'carrera', read_only=True)
    tipo_servicio_social_detalle = TipoServicioSocialSerializer(source = 'tipo_servicio_social', read_only=True)
    class Meta:
        model = Propuesta
        fields = "__all__"
    def create(self, validated_data):
        propuesta = Propuesta.objects.create(**validated_data)
        return propuesta

class EntidadExternaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntidadExterna
        fields = ['codigo_entidad','nombre_entidad','direccion_entidad','correo_entidad','telefono_entidad','clasificacion_entidad']
    def create(self, validate_data):
        entidad = EntidadExterna.objects.create(**validate_data)
        return entidad
        
class UsuariosGestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','last_login','is_superuser', 'username', 'password', 'first_name','last_name','email','is_staff','is_active','date_joined','tipo_usuario']
        extra_kwargs = {'password': {'write_only':True, 'required':False}} #Como el administrador editaria los demas datos, no necesita password
    def create(self, validated_data):
        usuarios = User.objects.create_user(**validated_data)
        return usuarios

class ServicioSocialSerializer(serializers.ModelSerializer):
    entidad_externa_detalle =  EntidadExternaSerializer(source = 'entidad_externa', read_only=True)
    tipo_servicio_social_detalle = TipoServicioSocialSerializer(source = 'tipo_servicio_social', read_only=True)
    solicitud_detalle = SolicitudSerializer(source = 'solicitud', read_only=True)
    propuesta_detalle = PropuestaSerializer(source = 'propuesta', read_only=True)
    class Meta:
        model = ServicioSocial
        fields = "__all__"
    def create(self, validated_data):
        servicioSocial = ServicioSocial.objects.create(**validated_data)
        return servicioSocial

class SolicitudUpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudUps
        fields = ['codigo_solicitud_ups','enlace','observaciones','estado_solicitud','estudiante']
    def create(self, validate_data):
        solicitudUps = SolicitudUps.objects.create(**validate_data)
        return solicitudUps

class TipoContenidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = "__all__"
    def create(self, validated_data):
        tipoContenido = ContentType.objects.create(**validated_data)
        return tipoContenido

class SolicitudServicioSerializer(serializers.ModelSerializer):
    servicio_social_detalle = ServicioSocialSerializer(source='servicio_social', read_only=True)
    class Meta:
        model = SolicitudServicioSocial
        fields = "__all__"
    def create(self, validate_data):
        solicitudServicio = SolicitudServicioSocial.objects.create(**validate_data)
        return solicitudServicio

class EscuelaSerializer(serializers.ModelSerializer):
    carrera_detalle = CarreraSerializer(source = 'carrera', read_only=True)
    class Meta:
        model = Escuela
        fields = "__all__"

class DocenteSerializer(serializers.ModelSerializer):
    escuela_detalle = EscuelaSerializer(source = 'escuela', read_only=True)
    class Meta:
        model = Docente
        fields = "__all__" 

class EncargadoEscuelaSerializer(serializers.ModelSerializer):
    docente_detalle =  DocenteSerializer(source = 'docente_encargado', read_only=True)
    usuario_detalle = UsuarioSerializer(source = 'user', read_only=True)
    class Meta:
        model = EncargadoEscuela
        fields = "__all__"

class EncargadoFacultadSerializer(serializers.ModelSerializer):
    docente_detalle =  DocenteSerializer(source = 'docente_encargado', read_only=True)
    usuario_detalle = UsuarioSerializer(source = 'user', read_only=True)
    class Meta:
        model = EncargadoFacultad
        fields = "__all__"
        
class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroActividad
        fields = "__all__"

class ProyectoSerializer(serializers.ModelSerializer):
    solicitud_servicio_detalle = SolicitudServicioSerializer(source='solicitud_servicio', read_only=True)
    class Meta:
        model = Proyecto
        fields = "__all__"
    def create(self, validate_data):
        proyecto = Proyecto.objects.create(**validate_data)
        return proyecto
        
