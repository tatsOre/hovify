from django.db import models
from hovify import settings


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    lastname = models.CharField(max_length=45)
    email = models.EmailField(max_length=100)
    country = models.CharField(max_length=45, default='')
    city = models.CharField(max_length=45, blank=True, default='')
    phone_number = models.CharField(max_length=45, default='')
    birthday = models.DateField(auto_now=False, null=True, blank=True)
    summary = models.CharField(max_length=250, default='')
    linkedin_url = models.URLField(max_length=200, blank=True)
    portfolio_url = models.URLField(max_length=200, blank=True)
    github_url = models.URLField(max_length=200, blank=True)
    twitter_url = models.URLField(max_length=200, blank=True)

    """Many-to-many relationships: ---"""
    about = models.ManyToManyField('AboutUser',
                                   related_name='users', blank=True)
    interests = models.ManyToManyField('Interest',
                                       related_name='users', blank=True)
    tech_skills = models.ManyToManyField('TechSkill',
                                         related_name='users', blank=True)
    languages = models.ManyToManyField('Language',
                                       related_name='users', blank=True)
    motivations = models.ManyToManyField('Motivation',
                                         related_name='users', blank=True)
    job_fields = models.ManyToManyField('DesiredJobField',
                                       related_name='users', blank=True)
    job_locations = models.ManyToManyField('DesiredJobLocation',
                                           related_name='users', blank=True)
    vacancies = models.ManyToManyField('Vacancy',
                                       related_name='users', blank=True)


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=45, blank=True)
    description = models.CharField(max_length=250, blank=True)
    project_url = models.URLField(max_length=200, blank=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)


class Professional(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=45)
    role = models.CharField(max_length=100)
    initial_date = models.DateField(auto_now=False, null=True, blank=True)
    final_date =  models.DateField(auto_now=False, null=True, blank=True)
    description = models.TextField()
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    projectID = models.ForeignKey(Project, on_delete=models.CASCADE)


class Education(models.Model):
    id = models.AutoField(primary_key=True)
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    initial_date = models.DateField(auto_now=False, null=True, blank=True)
    final_date = models.DateField(auto_now=False, null=True, blank=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)


class Language(models.Model):
    """Ex: Spanish, English, French, etc
       Proficiency: level according stepper component(Curriculum Dashboard)
       Hay que checkear con qué escala se guardará, porcentajes? escala Cambridge?"""
    id = models.AutoField(primary_key=True)
    language = models.CharField(max_length=45)
    proficiency = models.CharField(max_length=20)


class TechSkill(models.Model):
    """Ex: Python, AWS, CSS, etc
       Level: level according stepper component(Curriculum Dashboard)"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    level = models.CharField(max_length=20)


class AboutUser(models.Model):
    """User description according selection form
    page ->> about that describes user//Interests"""
    id = models.AutoField(primary_key=True)
    description = models.TextField()
    status = models.BooleanField(default=False)


class Interest(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    status = models.BooleanField(default=False)


class Motivation(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    status = models.BooleanField(default=False)


class Vacancy(models.Model):
    id = models.AutoField(primary_key=True)
    job_title = models.CharField(max_length=45)
    journalism_type = models.CharField(max_length=45)
    company = models.CharField(max_length=45)
    company_url = models.URLField(max_length=200)
    category = models.CharField(max_length=45)
    location_required = models.CharField(max_length=45)
    requirements = models.TextField()
    salary = models.FloatField()
    description = models.TextField()
    published_at = models.DateField(auto_now=False, null=True, blank=True)
    vacancy_url = models.URLField(max_length=200)


class DesiredJobField(models.Model):
    """Desired Tech Field
    Page ---> Motivation/Dream Job/Desired Location"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    status = models.BooleanField(default=False)


class DesiredJobLocation(models.Model):
    """Country or global, latin America? check this?"""
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=45)


class Login(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=64)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
