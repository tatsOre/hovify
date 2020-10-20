
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProjectViewSet, ProfessionalViewSet, EducationViewSet, LanguagesViewSet, UserCreate, LoggedCurriculum
from .views import TechSkillViewSet, InterestViewSet, MotivationViewSet, AboutUserViewSet, VacancyViewSet, CurriculumDetail
from .views import DesiredJobFieldViewSet, DesiredJobLocationViewSet, VacancyUserViewSet
from rest_framework_extensions.routers import ExtendedSimpleRouter
from rest_framework.authtoken import views

router = ExtendedSimpleRouter()
(
    router.register(r'users', UserViewSet, basename='user').register(r'projects', ProjectViewSet, basename='users-project', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'professionals', ProfessionalViewSet, basename='user-professional', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'educations', EducationViewSet, basename='user-education', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'languages', LanguagesViewSet, basename='user-languages', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'techskills', TechSkillViewSet, basename='user-techskill', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'interests', InterestViewSet, basename='user-interests', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'aboutusers', AboutUserViewSet, basename='user-aboutusers', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'motivations', MotivationViewSet, basename='user-motivations', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'desiredjobfields', DesiredJobFieldViewSet, basename='user-desiredjobfields', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'desiredjoblocations', DesiredJobLocationViewSet, basename='user-desiredjoblocations', parents_query_lookups=['userID']),
    router.register(r'users', UserViewSet, basename='user').register(r'vacancies', VacancyUserViewSet, basename='vacancy', parents_query_lookups=['users']),
    router.register(r'vacancies', VacancyViewSet, basename='vacancy'),
)

urlpatterns = [
        path('signup/', UserCreate.as_view(), name='createuser'),
        path('curriculums/<int:pk>/', CurriculumDetail.as_view(), name='professional_view'),
        path('curriculum/', LoggedCurriculum.as_view(), name='getcurriculum'),
        path("login/", views.obtain_auth_token, name="login"),
]

urlpatterns += router.urls
