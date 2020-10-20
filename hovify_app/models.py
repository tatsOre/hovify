from django.db import models
from hovify import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    FirstName = models.CharField(max_length=45)
    LastName = models.CharField(max_length=45)
    Country = models.CharField(max_length=45, default='')
    City = models.CharField(max_length=45, null=True, blank=True, default='')
    PhoneNumber = models.CharField(max_length=45, null=True, default='')
    Birthday = models.DateField(auto_now=False, null=True, blank=True)
    Summary = models.CharField(max_length=1000, default='')
    LinkedIn = models.CharField(max_length=200, null=True, blank=True)
    PortfolioURL = models.CharField(max_length=200, null=True, blank=True)
    GitHubURL = models.CharField(max_length=200, null=True, blank=True)
    TwitterURL = models.CharField(max_length=200, null=True, blank=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    link = models.URLField(max_length=200, blank=True, null=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Professional(models.Model):
    professional_id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100, null=True, blank=True)
    start_year	= models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Education(models.Model):
    education_id = models.AutoField(primary_key=True)
    school = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    start_year	= models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Language(models.Model):
    """Ex: Spanish, English, French, etc
       Proficiency: level according stepper component(Curriculum Dashboard)
       Hay que checkear con qué escala se guardará, porcentajes? escala Cambridge?"""
    language_id = models.AutoField(primary_key=True)
    language = models.CharField(max_length=45)
    proficiency = models.CharField(max_length=20, null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class TechSkill(models.Model):
    """Ex: Python, AWS, CSS, etc
       Level: level according stepper component(Curriculum Dashboard)"""
    techskill_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=20, null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class AboutUser(models.Model):
    """User description according selection form
    page ->> about that describes user//Interests"""
    aboutuser_id = models.AutoField(primary_key=True)
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Interest(models.Model):
    interest_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Motivation(models.Model):
    motivation_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Vacancy(models.Model):
    vacancy_id = models.AutoField(primary_key=True)
    job_title = models.CharField(max_length=45)
    schedule_type = models.CharField(max_length=45)
    company = models.CharField(max_length=100)
    category = models.CharField(max_length=45)
    location_required = models.CharField(max_length=45)
    requirements = models.TextField()
    salary = models.CharField(max_length=45, blank=True)
    description = models.TextField()
    published_at = models.DateField(auto_now=False, null=True, blank=True)
    vacancy_url = models.URLField(max_length=200)
    users = models.ManyToManyField('Profile', related_name='vacancies', blank=True)

class DesiredJobField(models.Model):
    """Desired Tech Field
    Page ---> Motivation/Dream Job/Desired Location"""
    desirejobfield_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class DesiredJobLocation(models.Model):
    """Country or global, latin America? check this?"""
    desiredjobloc_id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Curriculum(models.Model):
    """Country or global, latin America? check this?"""
    user = models.ForeignKey('Profile', on_delete=models.CASCADE)