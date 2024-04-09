from django.shortcuts import render, redirect, HttpResponse
from asgiref.sync import sync_to_async
from luna.settings import SITE_IP, SITE_HOST, STATIC_ROOT
import os

DEFAULT_LANG = os.getenv('DEFAULT_LANGUAGE')

def handler404(request, exception=None, template_name='errors/404.html'):
    return render(request, template_name, status=404)

def handler500(request):
    return render(request, 'errors/500.html')

async def get_language(request):
    language = await sync_to_async(request.session.get)('language', DEFAULT_LANG)  # get language from user data
    if language in ['es', 'en']:
        return language
    # no valid language set
    return DEFAULT_LANG


async def index(request):
    language = await get_language(request)
    return render(request, 'index.html', {'language': language})


async def bios(request):
    language = await get_language(request)
    return render(request, "bios.html", {'language': language})


async def gallery(request):
    language = await get_language(request)
    return render(request, "gallery.html", {'language': language})


async def contact(request):
    language = await get_language(request)
    return render(request, "contact.html", {'language': language})
