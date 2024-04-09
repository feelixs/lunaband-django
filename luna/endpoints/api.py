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
    # endpoint to set the user's default language - uses the 'request' object to set the user's session cookie
    # can be called thru javascript
    try:
        data = json.loads(request.body)
        language = data.get('language')
        if not language:
            return JsonResponse({'error': 'Language parameter is missing'}, status=400)
        await sync_to_async(views.set_language)(request, language)
        return JsonResponse({'message': 'Language set successfully'}, status=200)
    except:
        return JsonResponse({'message': traceback.format_exc()}, status=500)
