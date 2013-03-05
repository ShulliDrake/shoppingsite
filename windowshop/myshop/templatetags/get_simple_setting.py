# Get settings value
from django import template
from django.conf import settings

register = template.Library()


def get_simple_setting(name, key=None):
    if not key:
        return settings.__getattr__(name)
    else:
        dictionary = settings.__getattr__(name)
        return dictionary[key]

register.simple_tag(get_simple_setting)
