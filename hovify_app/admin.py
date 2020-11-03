""" Added models to the admin panel
"""

from django.contrib import admin

from .models import Project, Professional, Education
from .models import Language, TechSkill, AboutUser, Vacancy
from .models import Motivation, DesiredJobField
from .models import DesiredJobLocation, Interest, Curriculum, Profile

# Register your models here.
admin.site.register(Project)
admin.site.register(Professional)
admin.site.register(Education)
admin.site.register(Language)
admin.site.register(TechSkill)
admin.site.register(AboutUser)
admin.site.register(Motivation)
admin.site.register(DesiredJobField)
admin.site.register(DesiredJobLocation)
admin.site.register(Interest)
admin.site.register(Vacancy)
admin.site.register(Curriculum)
