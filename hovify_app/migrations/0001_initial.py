# Generated by Django 2.1 on 2020-10-24 02:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import hovify.storage_backends


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AboutUser',
            fields=[
                ('aboutuser_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Curriculum',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_path', models.FileField(blank=True, storage=hovify.storage_backends.PrivateMediaStorage(), upload_to='')),
                ('preview_path', models.FileField(blank=True, storage=hovify.storage_backends.PrivateMediaStorage(), upload_to='')),
                ('cover_letter', models.FileField(blank=True, storage=hovify.storage_backends.PrivateMediaStorage(), upload_to='')),
                ('csv_data', models.FileField(blank=True, storage=hovify.storage_backends.PrivateMediaStorage(), upload_to='')),
                ('userID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DesiredJobField',
            fields=[
                ('desirejobfield_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='DesiredJobLocation',
            fields=[
                ('desiredjobloc_id', models.AutoField(primary_key=True, serialize=False)),
                ('location', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('education_id', models.AutoField(primary_key=True, serialize=False)),
                ('school', models.CharField(max_length=100)),
                ('degree', models.CharField(max_length=100)),
                ('start_year', models.IntegerField(blank=True, null=True)),
                ('end_year', models.IntegerField(blank=True, null=True)),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('interest_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('language_id', models.AutoField(primary_key=True, serialize=False)),
                ('language', models.CharField(max_length=45)),
                ('proficiency', models.CharField(blank=True, max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Motivation',
            fields=[
                ('motivation_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('professional_id', models.AutoField(primary_key=True, serialize=False)),
                ('company', models.CharField(max_length=100)),
                ('role', models.CharField(blank=True, max_length=100, null=True)),
                ('start_year', models.IntegerField(blank=True, null=True)),
                ('end_year', models.IntegerField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FirstName', models.CharField(max_length=45)),
                ('LastName', models.CharField(max_length=45)),
                ('Location', models.CharField(blank=True, default='', max_length=45, null=True)),
                ('Role', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('City', models.CharField(blank=True, default='', max_length=45, null=True)),
                ('PhoneNumber', models.CharField(blank=True, default='', max_length=45, null=True)),
                ('Birthday', models.DateField(blank=True, null=True)),
                ('Summary', models.CharField(blank=True, default='', max_length=1000, null=True)),
                ('LinkedIn', models.CharField(blank=True, max_length=200, null=True)),
                ('PortfolioURL', models.CharField(blank=True, max_length=200, null=True)),
                ('GitHubURL', models.CharField(blank=True, max_length=200, null=True)),
                ('TwitterURL', models.CharField(blank=True, max_length=200, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('project_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100)),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('link', models.URLField(blank=True, null=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='TechSkill',
            fields=[
                ('techskill_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('level', models.CharField(blank=True, max_length=20, null=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('vacancy_id', models.AutoField(primary_key=True, serialize=False)),
                ('job_title', models.CharField(max_length=45)),
                ('schedule_type', models.CharField(max_length=45)),
                ('company', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=45)),
                ('location_required', models.CharField(max_length=45)),
                ('requirements', models.TextField()),
                ('salary', models.CharField(blank=True, max_length=45)),
                ('description', models.TextField()),
                ('published_at', models.DateField(blank=True, null=True)),
                ('vacancy_url', models.URLField()),
                ('users', models.ManyToManyField(blank=True, related_name='vacancies', to='hovify_app.Profile')),
            ],
        ),
        migrations.AddField(
            model_name='professional',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='motivation',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='language',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='interest',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='education',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='desiredjoblocation',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='desiredjobfield',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
        migrations.AddField(
            model_name='aboutuser',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Profile'),
        ),
    ]
