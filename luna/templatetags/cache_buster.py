from django import template
import os

register = template.Library()

@register.simple_tag
def cache_buster(static_file):
    """Appends the edit timestamp to the static file so the browser always refreshes its cache when the file's been edited"""
    full_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "../felixcreations-web/static", static_file)
    url_path = f"/static/{static_file}"
    try:
        timestamp = os.path.getmtime(full_path) # file modification time
    except OSError:
        return url_path  # File not found, OS couldn't retrieve edit time
    return f"{url_path}?v={timestamp}"
