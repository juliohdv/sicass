# Generated by Django 3.2.4 on 2021-06-21 02:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Carrera',
            fields=[
                ('codigo_carrera', models.CharField(max_length=25, primary_key=True, serialize=False, unique=True)),
                ('nombre_carrera', models.CharField(max_length=100)),
                ('cantidad_materias', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='EntidadExterna',
            fields=[
                ('codigo_entidad', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('nombre_entidad', models.CharField(max_length=150, unique=True)),
                ('direccion_entidad', models.CharField(max_length=250)),
                ('correo_entidad', models.EmailField(max_length=254)),
                ('telefono_entidad', models.IntegerField()),
                ('clasificacion_entidad', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('codigo_estado', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('estado_actual', models.CharField(max_length=25)),
                ('observaciones', models.CharField(max_length=500)),
                ('motivo', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Facultad',
            fields=[
                ('codigo_facultad', models.CharField(max_length=25, primary_key=True, serialize=False, unique=True)),
                ('nombre_facultad', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TipoServicioSocial',
            fields=[
                ('condigo_tipo_servicio_social', models.CharField(max_length=25, primary_key=True, serialize=False, unique=True)),
                ('nombre_tipo_servicio_social', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Solicitud',
            fields=[
                ('codigo_solicitud', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('fecha_inicio_solicitud', models.DateField()),
                ('fecha_fin_solicitud', models.DateField()),
                ('entidad_externa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.entidadexterna')),
                ('facultad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.facultad')),
                ('tipo_servicio_social', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.tiposerviciosocial')),
            ],
        ),
        migrations.CreateModel(
            name='Propuesta',
            fields=[
                ('codigo_propuesta', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('descripcion_propuesta', models.TextField(max_length=750)),
                ('entidad_externa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.entidadexterna')),
                ('facultad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.facultad')),
                ('tipo_servicio_social', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.tiposerviciosocial')),
            ],
        ),
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('carnet', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('nombres_estudiante', models.CharField(max_length=50)),
                ('apellidos_estudiante', models.CharField(max_length=50)),
                ('correo_estudiante', models.EmailField(max_length=254)),
                ('sexo', models.CharField(max_length=15)),
                ('direccion_estudiante', models.CharField(max_length=250)),
                ('telefono_estudiante', models.IntegerField()),
                ('carrera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.carrera')),
            ],
        ),
        migrations.AddField(
            model_name='carrera',
            name='facultad',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.facultad'),
        ),
    ]