import traceback
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from luna import views, tools
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


@sync_to_async
@csrf_exempt
@async_to_sync
async def email(request):
    # endpoint to send an email to our client from the user thru "contact us" page
    email_from = None
    to = None
    subject = None
    msg = None

    authorization_header = request.headers.get("Authorization")
    if authorization_header != f"1234": # TODO replace this with better passwd
        return JsonResponse({'success': False, 'msg': 'Forbidden', 'status_code': 403})
    try:
        email_from = request.POST.get('from')
        to = request.POST.get('to')
        subject = request.POST.get('subject')
        msg = request.POST.get('message')
        await tools.send_email(sender=email_from, to=to, subject=subject, message_text=msg)
    except:
        return JsonResponse({'success': False,  'values': [email_from, to, subject, msg], 'msg': traceback.format_exc(), 'status_code': 403})
