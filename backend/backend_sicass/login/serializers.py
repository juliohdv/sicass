from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from .models import *
from rest_framework.authtoken.models import Token

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only':True, 'required':True}} #Con esto hacemos que la contraseña no sea visible en las peticiones y que sea requerida en las creaciones

    def create(self, validated_data):
        usuario = User.objects.create_user(**validated_data)
        Token.objects.create(user=usuario) #Asignamos un token al usuario creado
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
        fields = ['carnet','nombres_estudiante','apellidos_estudiante','correo_estudiante','sexo','direccion_estudiante','telefono_estudiante','carrera']
    
    def create(self, validated_data):
        estudiante = Estudiante.objects.create(**validated_data)
        return estudiante

class PermisosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['id', 'name', 'content_type_id', 'codename']

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

class EntidadExternaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntidadExterna
        fields = ['codigo_entidad','nombre_entidad','direccion_entidad','correo_entidad','telefono_entidad','clasificacion_entidad']
    def create(self, validate_data):
        entidad = EntidadExterna.objects.create(**validate_data)
        return entidad
        
