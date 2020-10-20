
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProjectViewSet, ProfessionalViewSet, EducationViewSet, LanguagesViewSet, UserCreate, LoggedCurriculum
from .views import TechSkillViewSet, InterestViewSet, MotivationViewSet, AboutUserViewSet, VacancyViewSet, CurriculumDetail
from .views import DesiredJobFieldViewSet, DesiredJobLocationViewSet, CurriculumViewSet, VacancyUserViewSet, LoginView
from rest_framework_extensions.routers import ExtendedSimpleRouter
from rest_framework.authtoken import views
#router = DefaultRouter()
#router.register('users', UserViewSet, basename='users')
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
    #router.register(r'curriculums', CurriculumViewSet, basename='curriculum'),
    router.register(r'users', UserViewSet, basename='user').register(r'vacancies', VacancyUserViewSet, basename='vacancy', parents_query_lookups=['users']),
    router.register(r'vacancies', VacancyViewSet, basename='vacancy')

)
#router.register('users/<int:users_id>/projects', ProjectViewSet, basename='projects')
#router.register('users/<int:users_id>/professionals', ProfessionalViewSet, basename='users/professionals')
#router.register('users/<int:users_id>/educations', EducationViewSet, basename='users/educations')
#router.register('users/<int:users_id>/languages', LanguagesViewSet, basename='users/languages')
#router.register('users/<int:users_id>/techskills', TechSkillViewSet, basename='users/techskills')
#router.register('users/<int:users_id>/interests', InterestViewSet, basename='users/interests')
#router.register('users/<int:users_id>/aboutusers', AboutUserViewSet, basename='aboutusers')
#router.register('users/<int:users_id>/motivations', MotivationViewSet, basename='users/motivations')
#router.register('users/<int:users_id>/desiredjobfields', DesiredJobFieldViewSet, basename='users/desiredjobfields')
#router.register('users/<int:users_id>/desiredjoblocation', DesiredJobLocationViewSet, basename='users/desiredjoblocation')
#router.register('login', LoginViewSet, basename='login')

urlpatterns = [
        path('signup/', UserCreate.as_view(), name='createuser'),
        path('curriculums/', CurriculumViewSet.as_view(), name='professional_view'),
        path('curriculums/<int:pk>/', CurriculumDetail.as_view(), name='professional_view'),
        path('curriculum/', LoggedCurriculum.as_view(), name='getcurriculum'),
        path("login/", views.obtain_auth_token, name="login"),
]

urlpatterns += router.urls