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
    def create(self, validated_data):
        permiso = Permission.objects.create(**validated_data)
        return permiso

class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = ['codigo_solicitud','fecha_inicio_solicitud','fecha_fin_solicitud','estado_solicitud','entidad_externa','carrera','tipo_servicio_social']
    def create(self, validated_data):
        solicitud = Solicitud.objects.create(**validated_data)
        return solicitud

class PropuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propuesta
        fields = ['codigo_propuesta','fecha_inicio_propuesta','fecha_fin_propuesta', 'descripcion_propuesta', 'estado_propuesta','entidad_externa','carrera','tipo_servicio_social']
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
        