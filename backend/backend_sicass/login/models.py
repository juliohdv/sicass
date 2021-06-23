from django.db import models
from django.db.models.expressions import Case
from django.db.models.fields import CharField, DateField, TextField
from django.db.models.fields.related import ForeignKey

# Create your models here.
class EntidadExterna(models.Model):
    codigo_entidad = models.BigAutoField(primary_key=True, unique=True)
    nombre_entidad = models.CharField(max_length=150, unique=True)
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
    def __str__(self):
        return '%s %s' % (self.nombres_estudiante, self.apellidos_estudiante)

class Solicitud(models.Model):
    codigo_solicitud = models.IntegerField(primary_key=True,unique=True)
    fecha_inicio_solicitud = DateField()
    fecha_fin_solicitud = DateField()
    entidad_externa = models.ForeignKey(EntidadExterna, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    tipo_servicio_social = models.ForeignKey(TipoServicioSocial, on_delete=models.CASCADE)
    def __str__(self):
        return '%s' % (self.codigo_solicitud)

class Propuesta(models.Model):
    codigo_propuesta = models.IntegerField(primary_key=True, unique=True)
    fecha_inicio_propuesta = DateField
    fecha_fin_propuesta = DateField
    descripcion_propuesta = TextField(max_length=750)
    entidad_externa =models.ForeignKey(EntidadExterna, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, default='')
    tipo_servicio_social = models.ForeignKey(TipoServicioSocial, on_delete=models.CASCADE)
    def __str__(self):
        return '%s' % (self.codigo_propuesta)
