from django.db import models
from hovify import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from hovify.storage_backends import PrivateMediaStorage


class Profile(models.Model):
    """Profile model to extend User fields
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    FirstName = models.CharField(max_length=45)
    LastName = models.CharField(max_length=45)
    Location = models.CharField(
        max_length=45,
        default='',
        blank=True,
        null=True)
    Role = models.CharField(max_length=100, default='', blank=True, null=True)
    City = models.CharField(max_length=45, null=True, blank=True, default='')
    PhoneNumber = models.CharField(
        max_length=45, null=True, default='', blank=True)
    Birthday = models.DateField(auto_now=False, null=True, blank=True)
    Summary = models.CharField(
        max_length=1000,
        default='',
        blank=True,
        null=True)
    LinkedIn = models.CharField(max_length=200, null=True, blank=True)
    PortfolioURL = models.CharField(max_length=200, null=True, blank=True)
    GitHubURL = models.CharField(max_length=200, null=True, blank=True)
    TwitterURL = models.CharField(max_length=200, null=True, blank=True)


class Curriculum(models.Model):
    """Curriculum model to store resumes in AWS bucket"""
    userID = models.OneToOneField(User, on_delete=models.CASCADE)
    pdf_path = models.FileField(storage=PrivateMediaStorage(), blank=True)
    preview_path = models.FileField(storage=PrivateMediaStorage(), blank=True)
    cover_letter = models.FileField(storage=PrivateMediaStorage(), blank=True)
    csv_data = models.FileField(storage=PrivateMediaStorage(), blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Every time a new user is created, a new profile
     and curriculum is also created

    Args:
        sender : Model that sends the data
        instance : Instance of the model
        created (boolean): Value to know if the instance is created
    """
    if created:
        Profile.objects.create(user=instance)
        Curriculum.objects.create(userID=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Every time a new user is created,
    a new profile and curriculum is also created

    Args:
        sender : Model that sends the data
        instance : Instance of the model
        created (boolean): Value to know if the instance is created
    """
    instance.profile.save()
    instance.curriculum.save()


class Project(models.Model):
    """Model that contains information about user projects
    """
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    link = models.URLField(max_length=200, blank=True, null=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Professional(models.Model):
    """Model that contains information about user professional experience
    """
    professional_id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100, null=True, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Education(models.Model):
    """Model that contains information about user education experience
    """
    education_id = models.AutoField(primary_key=True)
    school = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Language(models.Model):
    """Ex: Spanish, English, French, etc
       Proficiency: level according stepper component(Curriculum Dashboard)"""
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
    """Interest selected in the front end
    """
    interest_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Motivation(models.Model):
    """Motivations selected in the front end
    """
    motivation_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Vacancy(models.Model):
    """Vacancies obtained to apply
    """
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
    users = models.ManyToManyField(
        'Profile', related_name='vacancies', blank=True)


class DesiredJobField(models.Model):
    """Desired Tech Field
    Page ---> Motivation/Dream Job/Desired Location"""
    desirejobfield_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)


class DesiredJobLocation(models.Model):
    """Country or global desired to work with"""
    desiredjobloc_id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)
