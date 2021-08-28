# Generated by Django 3.2.4 on 2021-08-20 03:14

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('tipo_usuario', models.PositiveSmallIntegerField(choices=[(1, 'estudiante'), (2, 'encargadoFacultad'), (3, 'encargadoEscuela'), (4, 'admin')])),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
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
                ('codigo_entidad', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre_entidad', models.CharField(max_length=150)),
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
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
            name='Propuesta',
            fields=[
                ('codigo_propuesta', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('fecha_inicio_propuesta', models.DateField(auto_now=True)),
                ('fecha_fin_propuesta', models.DateField()),
                ('descripcion_propuesta', models.TextField(max_length=750)),
                ('estado_propuesta', models.TextField(default='En Proceso', max_length=50)),
                ('carrera', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='login.carrera')),
                ('entidad_externa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.entidadexterna')),
            ],
        ),
        migrations.CreateModel(
            name='ServicioSocial',
            fields=[
                ('codigo_servicio_social', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('cantidad_estudiantes', models.IntegerField()),
                ('cantidad_horas', models.IntegerField()),
                ('descripcion', models.CharField(max_length=250)),
                ('entidad', models.CharField(max_length=150)),
                ('propuesta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.propuesta')),
            ],
        ),
        migrations.CreateModel(
            name='TipoServicioSocial',
            fields=[
                ('condigo_tipo_servicio_social', models.CharField(max_length=25, primary_key=True, serialize=False, unique=True)),
                ('nombre_tipo_servicio_social', models.CharField(max_length=100)),
                ('carrera', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='login.carrera')),
            ],
        ),
        migrations.CreateModel(
            name='SolicitudUps',
            fields=[
                ('codigo_solicitud_ups', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('enlace', models.CharField(max_length=500)),
                ('observaciones', models.CharField(max_length=500)),
                ('estado_solicitud', models.TextField(default='En Proceso', max_length=50)),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.estudiante')),
            ],
        ),
        migrations.CreateModel(
            name='SolicitudServicioSocial',
            fields=[
                ('codigo_solicitud_servicio', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('observaciones', models.CharField(max_length=500)),
                ('estado_solicitud', models.TextField(default='En Proceso', max_length=50)),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.estudiante')),
                ('servicio_social', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.serviciosocial')),
            ],
        ),
        migrations.CreateModel(
            name='Solicitud',
            fields=[
                ('codigo_solicitud', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('fecha_inicio_solicitud', models.DateField(auto_now=True)),
                ('fecha_fin_solicitud', models.DateField()),
                ('estado_solicitud', models.TextField(default='En Proceso', max_length=50)),
                ('carrera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.carrera')),
                ('entidad_externa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.entidadexterna')),
                ('tipo_servicio_social', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.tiposerviciosocial')),
            ],
        ),
        migrations.AddField(
            model_name='serviciosocial',
            name='solicitud',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.solicitud'),
        ),
        migrations.AddField(
            model_name='serviciosocial',
            name='tipo_servicio_social',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.tiposerviciosocial'),
        ),
        migrations.AddField(
            model_name='propuesta',
            name='tipo_servicio_social',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.tiposerviciosocial'),
        ),
        migrations.AddField(
            model_name='carrera',
            name='facultad',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.facultad'),
        ),
    ]