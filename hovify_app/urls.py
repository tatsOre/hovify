
from django.urls import path
from .views import users_lists, users_detail

urlpatterns = [
        path("users/", users_lists, name="users_lists"),
        path("users/<int:pk>/", users_detail, name="users_detail")
]