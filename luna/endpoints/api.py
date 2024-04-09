from django.http import JsonResponse
from django.shortcuts import render
import traceback
from django.views.decorators.http import require_http_methods
from luna import views
import json
from django.views.decorators.csrf import csrf_exempt
from asgiref.sync import sync_to_async, async_to_sync


@require_http_methods(["POST"])
async def set_language_api(request):
    def set_lang(req, lang):
        req.session['language'] = lang

    # endpoint to set the user's default language - uses the 'request' object to set the user's session cookie
    # can be called thru javascript
    data = json.loads(request.body.decode('utf-8'))
    language = data.get('language')
    if not language:
        return JsonResponse({'error': 'Language parameter is missing'}, status=400)
    await sync_to_async(set_lang)(request, language)
    return JsonResponse({'message': 'Language set successfully'}, status=200)
