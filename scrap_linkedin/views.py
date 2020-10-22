from rest_framework.decorators import api_view, schema
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .linkedin_scraper import LinkedinScraper
new_scraping = LinkedinScraper()

class LinkedinViewSet(APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, request):
        result = new_scraping.get_data(request.data.get("url"))
        return Response(result)