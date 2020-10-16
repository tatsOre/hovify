# Generated by Django 2.1.1 on 2020-10-15 05:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutUser',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='DesiredJobField',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='DesiredJobLocation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('location', models.CharField(max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('institution', models.CharField(max_length=100)),
                ('degree', models.CharField(max_length=100)),
                ('initial_date', models.DateField(blank=True, null=True)),
                ('final_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('language', models.CharField(max_length=45)),
                ('proficiency', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=45)),
                ('password', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Motivation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('company', models.CharField(max_length=45)),
                ('role', models.CharField(max_length=100)),
                ('initial_date', models.DateField(blank=True, null=True)),
                ('final_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('project_name', models.CharField(blank=True, max_length=45)),
                ('description', models.CharField(blank=True, max_length=250)),
                ('project_url', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='TechSkill',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('level', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('lastname', models.CharField(max_length=45)),
                ('email', models.EmailField(max_length=100)),
                ('country', models.CharField(default='', max_length=45)),
                ('city', models.CharField(blank=True, default='', max_length=45)),
                ('phone_number', models.CharField(default='', max_length=45)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('summary', models.CharField(default='', max_length=250)),
                ('linkedin_url', models.URLField(blank=True)),
                ('portfolio_url', models.URLField(blank=True)),
                ('github_url', models.URLField(blank=True)),
                ('twitter_url', models.URLField(blank=True)),
                ('about', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.AboutUser')),
                ('interests', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.Interest')),
                ('job_fields', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.DesiredJobField')),
                ('job_locations', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.DesiredJobLocation')),
                ('languages', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.Language')),
                ('motivations', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.Motivation')),
                ('tech_skills', models.ManyToManyField(blank=True, related_name='users', to='hovify_app.TechSkill')),
            ],
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('job_title', models.CharField(max_length=45)),
                ('journalism_type', models.CharField(max_length=45)),
                ('company', models.CharField(max_length=45)),
                ('company_url', models.URLField()),
                ('category', models.CharField(max_length=45)),
                ('location_required', models.CharField(max_length=45)),
                ('requirements', models.TextField()),
                ('salary', models.FloatField()),
                ('description', models.TextField()),
                ('published_at', models.DateField(blank=True, null=True)),
                ('vacancy_url', models.URLField()),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='vacancies',
            field=models.ManyToManyField(blank=True, related_name='users', to='hovify_app.Vacancy'),
        ),
        migrations.AddField(
            model_name='project',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.User'),
        ),
        migrations.AddField(
            model_name='professional',
            name='projectID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.Project'),
        ),
        migrations.AddField(
            model_name='professional',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.User'),
        ),
        migrations.AddField(
            model_name='login',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.User'),
        ),
        migrations.AddField(
            model_name='education',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hovify_app.User'),
        ),
    ]
