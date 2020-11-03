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
    """Endpoint to get user LinkedIn information

    Returns:
        JSON with LinkedIn profile information
    """
    authentication_classes = ()
    permission_classes = ()
    serializer_class = LinkedinSerializer

    def post(self, request):
        if not request.data.get("url") or len(request.data.get("url")) == 0:
            return Response("Empty URL", status=status.HTTP_400_BAD_REQUEST)
        result = new_scraping.get_data(request.data.get("url"))
        return Response(result)
