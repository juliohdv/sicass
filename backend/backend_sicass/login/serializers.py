from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'tipo_usuario']
        extra_kwargs = {'password': {'write_only':True, 'required':True}} #Con esto hacemos que la contraseña no sea visible en las peticiones y que sea requerida en las creaciones

    def create(self, validated_data):
        usuario = User.objects.create_user(**validated_data)
        return usuario
    

class TipoServicioSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServicioSocial
        fields = ['condigo_tipo_servicio_social', 'nombre_tipo_servicio_social','carrera']
    
class FacultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facultad
        fields = ['codigo_facultad', 'nombre_facultad']

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = ['codigo_carrera','nombre_carrera', 'cantidad_materias','facultad']

class EstudianteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Estudiante
        fields = ['carnet','nombres_estudiante','apellidos_estudiante','correo_estudiante','sexo','direccion_estudiante','telefono_estudiante','carrera','user']
    
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
        fields = ['id','last_login','is_superuser', 'username', 'first_name','last_name','email','is_staff','is_active','date_joined','tipo_usuario']
    def create(self, validated_data):
        usuarios = User.objects.create(**validated_data)
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