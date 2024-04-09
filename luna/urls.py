"""
URL configuration for luna project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import handler404
from django.urls import path
from luna import views
from luna.endpoints import api

handler404 = 'luna.views.handler404'
handler500 = 'luna.views.handler500'

urlpatterns = [
    #path("admin/", admin.site.urls),
    path("", views.index, name="home"),
    path("bios/", views.bios, name="bios"),
    path("gallery/", views.gallery, name="gallery"),
    path("contact/", views.contact, name="contact"),

    # todo implement saving user default languages as cookie
    path("api/set-language/", api.set_language_api, name="set_language_endpoint"),

    # todo replace with thank you page
    path("gracias/", views.index, name="thank-you"), # redirected to after subscribing through the custom patreon subscribe button

]
