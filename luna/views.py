from django.shortcuts import render, redirect
from asgiref.sync import sync_to_async
from luna.settings import SITE_IP, SITE_HOST, STATIC_ROOT
from luna import tools
import os


async def set_language(request, language):
    await sync_to_async(request.session.__setitem__)('language', language)


async def get_language(request):
    language = await sync_to_async(request.session.get)('language')  # get language from user data
    if language in ['es', 'en']:
        return language

    # no valid language set
    default = os.getenv('DEFAULT_LANGUAGE')
    await set_language(request, default)
    return default


async def index(request):
    language = await get_language(request)
    return render(request, 'index.html', {'language': language, 'subscribe_button': tools.get_patreon_subscribe_url()})


async def bios(request):
    language = await get_language(request)
    return render(request, "bios.html", {'language': language})


async def gallery(request):
    language = await get_language(request)
    return render(request, "gallery.html", {'language': language})


async def contact(request):
    language = await get_language(request)
    return render(request, "contact.html", {'language': language})
