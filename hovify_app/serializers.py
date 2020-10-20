from rest_framework import serializers

from .models import User, Project, Professional, Education, Language, TechSkill, AboutUser, Vacancy
from .models import Motivation, DesiredJobField, DesiredJobLocation, Interest, Curriculum, Profile
from rest_framework.authtoken.models import Token


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProfessionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professional
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class TechSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechSkill
        fields = '__all__'


class AboutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUser
        fields = '__all__'


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'


class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = '__all__'


class DesireJobFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesiredJobField
        fields = '__all__'


class DesireJobLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesiredJobLocation
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Profile
        fields = '__all__'


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'


class CurriculumSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    education = EducationSerializer(many=True, required=False)
    professional = ProfessionalSerializer(many=True, required=False)
    skills = TechSkillSerializer(many=True, required=False)
    languages = LanguageSerializer(many=True, required=False)
    projects = ProjectSerializer(many=True, required=False)
    about_user = AboutUserSerializer(many=True, required=False)
    motivation = MotivationSerializer(many=True, required=False)
    interest = InterestSerializer(many=True, required=False)
    desired_job_fields = DesireJobFieldSerializer(many=True, required=False)
    desired_job_locations = DesireJobLocationSerializer(
        many=True, required=False)
    vacancies = VacancySerializer(many=True, required=False)

    def create(self, validated_data):
        return Comment(**validated_data)
