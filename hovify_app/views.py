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
from django.http import JsonResponse

from .models import User


def users_lists(request):
    MAX_OBJECTS = 20
    users = User.objects.all()[:MAX_OBJECTS]
    data = {"results": list(users.values("id",
                                         "name",
                                         "lastname",
                                         "email",
                                         "country",
                                         "city",
                                         "phone_number",
                                         "birthday",
                                         "summary",
                                         "linkedin_url",
                                         "portfolio_url",
                                         "github_url",
                                         "twitter_url"
                                         ))}
    return JsonResponse(data)


def users_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    data = {"results": {
            "id": user.id,
            "name": user.name,
            "lastname": user.lastname,
            "email": user.email,
            "country": user.country,
            "city": user.city,
            "phone_number": user.phone_number,
            "birthday": user.birthday,
            "summary": user.summary,
            "linkedin_url": user.linkedin_url,
            "portfolio_url": user.portfolio_url,
            "github_url": user.github_url,
            "twitter_url": user.twitter_url
            }}
    return JsonResponse(data)
