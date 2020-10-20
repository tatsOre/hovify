"""
Views module:

        These views are meant to be the ones consumed
        by the frontend. Therefore all of these information
        has been processed from the data acquiered on the
        scrapping.

        To check the uris supported check the file:
                hovify_app/urls.py

"""
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Project, Professional, Education, Language, TechSkill, Curriculum, Vacancy
from .models import Motivation, DesiredJobField, DesiredJobLocation, Interest, AboutUser, Profile
from .serializers import UserSerializer, ProjectSerializer, ProfessionalSerializer, EducationSerializer, LanguageSerializer
from .serializers import TechSkillSerializer, InterestSerializer, MotivationSerializer, AboutUserSerializer, VacancySerializer
from .serializers import DesireJobFieldSerializer, DesireJobLocationSerializer, CurriculumSerializer, ProfileSerializer
from rest_framework.decorators import api_view, schema
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework_extensions.mixins import NestedViewSetMixin
from django.contrib.auth import authenticate

class UserCreate(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProjectViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProfessionalViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer

class EducationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class LanguagesViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class TechSkillViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TechSkill.objects.all()
    serializer_class = TechSkillSerializer

class AboutUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AboutUser.objects.all()
    serializer_class = AboutUserSerializer

class InterestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer

class MotivationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Motivation.objects.all()
    serializer_class = MotivationSerializer

class DesiredJobFieldViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DesiredJobField.objects.all()
    serializer_class = DesireJobFieldSerializer

class DesiredJobLocationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DesiredJobLocation.objects.all()
    serializer_class = DesireJobLocationSerializer

class LoggedCurriculum(APIView):
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)

    def post(self, request):
        data_list = [[] for x in range(10)]
        tasks = [request.data.get("Education"), request.data.get("Professional"), request.data.get("Skills"), request.data.get("Languages"), request.data.get("Projects"),
        request.data.get("About_User"), request.data.get("Motivation"), request.data.get("Interest"), request.data.get("Desired_Job_Fields"), request.data.get("Desired_Job_Location")]
        serializers = [EducationSerializer, ProfessionalSerializer, TechSkillSerializer, LanguageSerializer,
        ProjectSerializer, AboutUserSerializer, MotivationSerializer, InterestSerializer, DesireJobFieldSerializer, DesireJobLocationSerializer]
        userserializer = ProfileSerializer(data=request.data.get("User"))
        user = self.request.user
        profile = Profile.objects.get(user=user)
        userserializer = ProfileSerializer(profile, data=request.data.get('User'))
        if userserializer.is_valid():
            userserializer.save()
            user_id = userserializer.data["id"]
            for i in range(len(tasks)):
                for instance in tasks[i]:
                    for key in instance:
                        if type(instance[key]) is str:
                            instance[key] = instance[key].encode('ascii', 'ignore').decode()
                    instance["userID"] = user_id
                    data = serializers[i](data=instance)
                    if not data.is_valid():
                        print(data)
                        User.objects.get(user_id=user_id).delete()
                        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
                    data_list[i].append(data)
            for array in data_list:
                for data in array:
                    data.save()
            return Response(userserializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(userserializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = self.request.user
        profile = Profile.objects.get(user=user)
        profiledata = ProfileSerializer(profile)
        pk = profiledata.data['id']
        education = Education.objects.filter(userID=pk)
        professional = Professional.objects.filter(userID=pk)
        skills = TechSkill.objects.filter(userID=pk)
        language = Language.objects.filter(userID=pk)
        projects = Project.objects.filter(userID=pk)
        about_user = AboutUser.objects.filter(userID=pk)
        motivation = Motivation.objects.filter(userID=pk)
        interest = Interest.objects.filter(userID=pk)
        desired_job_field = DesiredJobField.objects.filter(userID=pk)
        desired_job_location = DesiredJobLocation.objects.filter(userID=pk)
        vacancy = Vacancy.objects.filter(users=pk)
        curriculum_dict = {
            "User": ProfileSerializer(profile).data,
            "Education": EducationSerializer(education, many=True).data,
            "Professional": ProfessionalSerializer(professional, many=True).data,
            "Skills": TechSkillSerializer(skills, many=True).data,
            "Languages": LanguageSerializer(language, many=True).data,
            "Projects": ProjectSerializer(projects, many=True).data,
            "About_User": AboutUserSerializer(about_user, many=True).data,
            "Motivation": MotivationSerializer(motivation, many=True).data,
            "Interest": InterestSerializer(interest, many=True).data,
            "Desired_Job_Fields": DesireJobFieldSerializer(desired_job_field, many=True).data,
            "Desired_Job_Location": DesireJobLocationSerializer(desired_job_location, many=True).data,
            "Vacancy": VacancySerializer(vacancy, many=True).data,
        }
        return Response(curriculum_dict)

    def put(self, request, format=None):
        data_list = [[] for x in range(10)]
        tasks = [request.data.get("Education"), request.data.get("Professional"), request.data.get("Skills"), request.data.get("Languages"), request.data.get("Projects"),
        request.data.get("About_User"), request.data.get("Motivation"), request.data.get("Interest"), request.data.get("Desired_Job_Fields"), request.data.get("Desired_Job_Location")]
        object_list = [Education, Professional, TechSkill, Language, Project, AboutUser, Motivation, Interest, DesiredJobField, DesiredJobLocation]
        serializers = [EducationSerializer, ProfessionalSerializer, TechSkillSerializer, LanguageSerializer, ProjectSerializer, AboutUserSerializer, MotivationSerializer, InterestSerializer, DesireJobFieldSerializer, DesireJobLocationSerializer]
        key_list = ['education_id', 'professional_id', 'techskill_id', 'language_id', 'project_id','aboutuser_id', 'motivation_id', 'interest_id', 'desirejobfield_id', 'desiredjobloc_id']
        user = self.request.user
        profile = Profile.objects.get(user=user)
        profiledata = ProfileSerializer(profile)
        userserializer = ProfileSerializer(profile, data=request.data.get("User"))
        if userserializer.is_valid():
            userserializer.save()
            user_id = userserializer.data["id"]
            for i in range(len(tasks)):
                for instance in tasks[i]:
                    instance["userID"] = user_id
                    about = object_list[i].objects.get(pk=instance[key_list[i]])
                    if about:
                        data = serializers[i](about, data=instance)
                    if not data or not data.is_valid():
                        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
                    data_list[i].append(data)
            for array in data_list:
                for data in array:
                    data.save()
            return Response(userserializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(userserializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurriculumViewSet(APIView):

    def post(self, request):
        data_list = [[] for x in range(10)]
        tasks = [request.data.get("Education"), request.data.get("Professional"), request.data.get("Skills"), request.data.get("Languages"), request.data.get("Projects"),
        request.data.get("About_User"), request.data.get("Motivation"), request.data.get("Interest"), request.data.get("Desired_Job_Fields"), request.data.get("Desired_Job_Location")]
        serializers = [EducationSerializer, ProfessionalSerializer, TechSkillSerializer, LanguageSerializer,
        ProjectSerializer, AboutUserSerializer, MotivationSerializer, InterestSerializer, DesireJobFieldSerializer, DesireJobLocationSerializer]
        new_user = UserSerializer(data=request.data.get("User"))
        userserializer = ProfileSerializer(data=request.data.get("User"))
        if userserializer.is_valid():
            userserializer.save()
            user_id = userserializer.data["id"]
            for i in range(len(tasks)):
                for instance in tasks[i]:
                    for key in instance:
                        if type(instance[key]) is str:
                            instance[key] = instance[key].encode('ascii', 'ignore').decode()
                    instance["userID"] = user_id
                    data = serializers[i](data=instance)
                    if not data.is_valid():
                        User.objects.get(user_id=user_id).delete()
                        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
                    data_list[i].append(data)
            for array in data_list:
                for data in array:
                    data.save()
            return Response(userserializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(userserializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurriculumDetail(APIView):
    def delete(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        data_list = [[] for x in range(10)]
        tasks = [request.data.get("Education"), request.data.get("Professional"), request.data.get("Skills"), request.data.get("Languages"), request.data.get("Projects"),
        request.data.get("About_User"), request.data.get("Motivation"), request.data.get("Interest"), request.data.get("Desired_Job_Fields"), request.data.get("Desired_Job_Location")]
        object_list = [Education, Professional, TechSkill, Language, Project, AboutUser, Motivation, Interest, DesiredJobField, DesiredJobLocation]
        serializers = [EducationSerializer, ProfessionalSerializer, TechSkillSerializer, LanguageSerializer, ProjectSerializer, AboutUserSerializer, MotivationSerializer, InterestSerializer, DesireJobFieldSerializer, DesireJobLocationSerializer]
        key_list = ['education_id', 'professional_id', 'techskill_id', 'language_id', 'project_id','aboutuser_id', 'motivation_id', 'interest_id', 'desirejobfield_id', 'desiredjobloc_id']
        user = get_object_or_404(User, pk=pk)
        userserializer = UserSerializer(user, data=request.data.get("User"))
        if userserializer.is_valid():
            userserializer.save()
            user_id = userserializer.data["user_id"]
            for i in range(len(tasks)):
                for instance in tasks[i]:
                    instance["userID"] = user_id
                    about = object_list[i].objects.get(pk=instance[key_list[i]])
                    if about:
                        data = serializers[i](about, data=instance)
                    if not data or not data.is_valid():
                        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
                    data_list[i].append(data)
            for array in data_list:
                for data in array:
                    data.save()
            return Response(userserializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(userserializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        education = Education.objects.filter(userID=pk)
        professional = Professional.objects.filter(userID=pk)
        skills = TechSkill.objects.filter(userID=pk)
        language = Language.objects.filter(userID=pk)
        projects = Project.objects.filter(userID=pk)
        about_user = AboutUser.objects.filter(userID=pk)
        motivation = Motivation.objects.filter(userID=pk)
        interest = Interest.objects.filter(userID=pk)
        desired_job_field = DesiredJobField.objects.filter(userID=pk)
        desired_job_location = DesiredJobLocation.objects.filter(userID=pk)
        vacancy = Vacancy.objects.filter(users=pk)
        curriculum_dict = {
            "User": UserSerializer(user).data,
            "Education": EducationSerializer(education, many=True).data,
            "Professional": ProfessionalSerializer(professional, many=True).data,
            "Skills": TechSkillSerializer(skills, many=True).data,
            "Languages": LanguageSerializer(language, many=True).data,
            "Projects": ProjectSerializer(projects, many=True).data,
            "About_User": AboutUserSerializer(about_user, many=True).data,
            "Motivation": MotivationSerializer(motivation, many=True).data,
            "Interest": InterestSerializer(interest, many=True).data,
            "Desired_Job_Fields": DesireJobFieldSerializer(desired_job_field, many=True).data,
            "Desired_Job_Location": DesireJobLocationSerializer(desired_job_location, many=True).data,
            "Vacancy": VacancySerializer(vacancy, many=True).data,
        }
        return Response(curriculum_dict)

class VacancyUserViewSet(NestedViewSetMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer

class VacancyViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer

class LoginView(APIView):
    permission_classes = ()

    def post(self, request,):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user:
            return Response({"token": user.auth_token.key})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)