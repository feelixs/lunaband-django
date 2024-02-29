from django.shortcuts import render, redirect
from asgiref.sync import sync_to_async
from luna.settings import SITE_IP, SITE_HOST, STATIC_ROOT
import os


async def index(request):
    return render(request, 'index.html')


async def bios(request):
    return render(request, "bios.html")


async def gallery(request):
    return render(request, "gallery.html")


async def contact(request):
    return render(request, "contact.html")
