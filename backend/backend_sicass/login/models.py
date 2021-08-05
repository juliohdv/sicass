from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models.expressions import Case
from django.db.models.fields import CharField, DateField, TextField
from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'estudiante'),
        (2, 'encargadoFacultad'),
        (3, 'encargadoEscuela'),
        (4,'admin'),
    )
    tipo_usuario = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=4)
class EntidadExterna(models.Model):
    codigo_entidad = models.BigAutoField(primary_key=True)
    nombre_entidad = models.CharField(max_length=150)
    direccion_entidad = models.CharField(max_length=250)
    correo_entidad = models.EmailField()
    telefono_entidad = models.IntegerField()
    clasificacion_entidad = models.CharField(max_length=25)
    def __str__(self):
        return '%s' % (self.nombre_entidad)

class Facultad(models.Model):
    codigo_facultad = models.CharField(max_length=25,primary_key=True, unique=True)
    nombre_facultad = models.CharField(max_length=50)
    def __str__(self):
        return '%s' % (self.nombre_facultad)

class Estado(models.Model):
    codigo_estado = models.IntegerField(primary_key=True, unique=True)
    estado_actual = models.CharField(max_length=25)
    observaciones = models.CharField(max_length=500)
    motivo = models.CharField(max_length=250)
    def __str__(self):
        return '%s' % (self.estado_actual)

class Carrera(models.Model):
    codigo_carrera = models.CharField(max_length=25, primary_key=True, unique=True)
    nombre_carrera = models.CharField(max_length=100)
    cantidad_materias = models.IntegerField()
    facultad = ForeignKey(Facultad, on_delete=models.CASCADE)
    def __str__(self):

        return '%s' % (self.nombre_carrera)
class TipoServicioSocial(models.Model):
    condigo_tipo_servicio_social = CharField(max_length=25, primary_key=True, unique=True)
    nombre_tipo_servicio_social = CharField(max_length=100)
    carrera = ForeignKey(Carrera, on_delete=models.CASCADE,default='')
    def __str__(self):
        return '%s' % (self.nombre_tipo_servicio_social)

class Estudiante(models.Model):
    carnet = models.CharField(max_length=10, primary_key=True, unique=True)
    nombres_estudiante = models.CharField(max_length=50)
    apellidos_estudiante = models.CharField(max_length=50)
    correo_estudiante = models.EmailField()
    sexo = models.CharField(max_length=15)
    direccion_estudiante = models.CharField(max_length=250)
    telefono_estudiante = models.IntegerField()
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return '%s %s' % (self.nombres_estudiante, self.apellidos_estudiante)

class Solicitud(models.Model):
    codigo_solicitud = models.BigAutoField(primary_key=True,unique=True)
    fecha_inicio_solicitud = DateField(auto_now=True)
    fecha_fin_solicitud = DateField()
    estado_solicitud = TextField(max_length=50,default='En Proceso')
    entidad_externa = models.ForeignKey(EntidadExterna, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    tipo_servicio_social = models.ForeignKey(TipoServicioSocial, on_delete=models.CASCADE)
    def __str__(self):
        return '%s' % (self.codigo_solicitud)
    
        

class Propuesta(models.Model):
    codigo_propuesta = models.BigAutoField(primary_key=True, unique=True)
    fecha_inicio_propuesta = DateField(auto_now=True)
    fecha_fin_propuesta = DateField()
    descripcion_propuesta = TextField(max_length=750)
    estado_propuesta = TextField(max_length=50,default='En Proceso')
    entidad_externa =models.ForeignKey(EntidadExterna, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, default='')
    tipo_servicio_social = models.ForeignKey(TipoServicioSocial, on_delete=models.CASCADE)
    def __str__(self):
        return '%s' % (self.codigo_propuesta)

class ServicioSocial(models.Model):
    codigo_servicio_social = models.BigAutoField(primary_key=True, unique=True)
    cantidad_estudiantes = models.IntegerField()
    cantidad_horas = models.IntegerField()
    descripcion = models.CharField(max_length=250)
    entidad = models.CharField(max_length=150)
    tipo_servicio_social = models.ForeignKey(TipoServicioSocial, on_delete=models.CASCADE)
    propuesta = models.ForeignKey(Propuesta, on_delete=models.CASCADE, blank=True, null=True)
    solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return '%s' % (self.codigo_servicio_social)
