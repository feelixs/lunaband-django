from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from luna import views

@require_http_methods(["POST"])
async def set_language(request):
    # endpoint to set the user's default language - uses the 'request' object to set the user's session cookie
    # can be called thru javascript
    data = await request.json()
    language = data.get('language')
    if not language:
        return JsonResponse({'error': 'Language parameter is missing'}, status=400)
    await views.set_language(request, language)
    return JsonResponse({'message': 'Language set successfully'}, status=200)
