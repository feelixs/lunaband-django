from django.shortcuts import render, redirect
from asgiref.sync import sync_to_async
from luna.settings import SITE_IP, SITE_HOST, STATIC_ROOT
import os


async def index(request):
    return render(request, 'index.html')
