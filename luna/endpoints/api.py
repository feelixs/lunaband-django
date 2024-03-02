from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from luna import views
from django.views.decorators.csrf import csrf_exempt
from asgiref.sync import sync_to_async, async_to_sync

@require_http_methods(["POST"])


@sync_to_async
@csrf_exempt
@async_to_sync
async def set_language(request):
    # endpoint to set the user's default language - uses the 'request' object to set the user's session cookie
    # can be called thru javascript
    data = await request.json()
    language = data.get('language')
    if not language:
        return JsonResponse({'error': 'Language parameter is missing'}, status=400)
    await views.set_language(request, language)
    return JsonResponse({'message': 'Language set successfully'}, status=200)
