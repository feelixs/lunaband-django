from django.shortcuts import render, redirect, HttpResponse
from asgiref.sync import sync_to_async
from luna.settings import SITE_IP, SITE_HOST, STATIC_ROOT
import os


def set_language(request, language):
    language = request.GET.get('language', 'en')  # Default to English if not specified
    response = HttpResponse(f"Language set to '{language}'")
    response.set_cookie('language', language, max_age=60 * 60 * 24 * 365)  # 1 year
    return response

def handler404(request, exception=None, template_name='errors/404.html'):
    return render(request, template_name, status=404)

def handler500(request):
    return render(request, 'errors/500.html')

async def get_language(request):
    language = await sync_to_async(request.COOKIES.get)('language', 'en')  # get language from user data
    if language in ['es', 'en']:
        return language

    # no valid language set
    default = os.getenv('DEFAULT_LANGUAGE')
    await sync_to_async(set_language)(request, default)
    return default


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
