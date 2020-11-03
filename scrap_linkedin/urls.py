from django.urls import path, include, re_path
from .views import LinkedinViewSet
urlpatterns = [
    path('api/v1/linkedindata/', LinkedinViewSet.as_view(), name='getdata'),
]
