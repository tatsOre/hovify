from rest_framework.decorators import api_view, schema
import datetime
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .linkedin_scraper import LinkedinScraper
from rest_framework import serializers
new_scraping = LinkedinScraper()

class LinkedinSerializer(serializers.Serializer):
    url = serializers.CharField()

class LinkedinViewSet(APIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = LinkedinSerializer

    def post(self, request):
        if not request.data.get("url") or len(request.data.get("url")) == 0:
            return Response("Empty URL", status=status.HTTP_400_BAD_REQUEST)
        result = new_scraping.get_data(request.data.get("url"))
        # Splitting skills from strengths
        if result.get('Skills'):
            result['Strengs'] = []
            tech = []
            for skill in result.get('Skills'):
                if skill.get('level') == 'Mid':
                    result['Strengs'].append(
                        {
                            "name": skill.get('name'),
                            "level": skill.get('level')
                        }
                    )
                else:
                    tech.append(
                        {
                            "name": skill.get('name'),
                            "level": skill.get('level')
                        }
                    )
            result['Skills'] = tech
        return Response(result)