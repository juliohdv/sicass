from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
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

class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = ['codigo_solicitud','fecha_inicio_solicitud','fecha_fin_solicitud','entidad_externa','carrera','tipo_servicio_social']
    def create(self, validated_data):
        solicitud = Solicitud.objects.create(**validated_data)
        return solicitud