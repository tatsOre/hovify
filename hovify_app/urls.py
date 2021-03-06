"""File to stablish what routes are available for the hovify_app
"""
from django.urls import path, include, re_path
from .views import FrontendAppView, LoggedCurriculum
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProjectViewSet, ProfessionalViewSet
from .views import EducationViewSet, LanguagesViewSet, UserCreate
from .views import TechSkillViewSet, InterestViewSet
from .views import AboutUserViewSet, VacancyViewSet, MotivationViewSet
from .views import CurriculumDetail, CurriculumViewSet
from .views import DesiredJobFieldViewSet, DesiredJobLocationViewSet
from .views import VacancyUserViewSet, LoggedDashboard
from rest_framework_extensions.routers import ExtendedSimpleRouter
from rest_framework.authtoken import views

router = ExtendedSimpleRouter()
(
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'projects',
        ProjectViewSet,
        basename='users-project',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'professionals',
        ProfessionalViewSet,
        basename='user-professional',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'educations',
        EducationViewSet,
        basename='user-education',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'languages',
        LanguagesViewSet,
        basename='user-languages',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'techskills',
        TechSkillViewSet,
        basename='user-techskill',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'interests',
        InterestViewSet,
        basename='user-interests',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'aboutusers',
        AboutUserViewSet,
        basename='user-aboutusers',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'motivations',
        MotivationViewSet,
        basename='user-motivations',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'desiredjobfields',
        DesiredJobFieldViewSet,
        basename='user-desiredjobfields',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'desiredjoblocations',
        DesiredJobLocationViewSet,
        basename='user-desiredjoblocations',
        parents_query_lookups=['userID']),
    router.register(
        r'api/v1/users',
        UserViewSet,
        basename='user').register(
        r'vacancies',
        VacancyUserViewSet,
        basename='vacancy',
        parents_query_lookups=['users']),
    router.register(r'api/v1/vacancies', VacancyViewSet, basename='vacancy'),
)

urlpatterns = [
    path('api/v1/signup/', UserCreate.as_view(), name='createuser'),
    path(
        'api/v1/curriculums/<int:pk>/',
        CurriculumDetail.as_view(),
        name='professional_view'),
    path(
        'api/v1/curriculums/',
        CurriculumViewSet.as_view(),
        name='setcurriculum'),
    path(
        'api/v1/curriculum/',
        LoggedCurriculum.as_view(),
        name='getcurriculum'),
    path("api/v1/login/", views.obtain_auth_token, name="login"),
    path("api/v1/dashboard/", LoggedDashboard.as_view(), name="get dashboard")
    # re_path(r'^', FrontendAppView.as_view()),
]

urlpatterns += router.urls
