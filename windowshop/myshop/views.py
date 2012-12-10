"""MyShop view functions"""
from django.conf import settings
from django.shortcuts import render_to_response
from django.template import RequestContext

import requests


def myshop(request):

    base_api = settings.API_PATH
    api = base_api % ("JP", "cute+cat+goods")  # county code, query

    r = requests.get(api)
    products = r.json.get('items')

    for p in products:
        description = p.get('product').get('description')
        description = description[:200] + '...'  if len(description) > 200 else description
        p['product']['description'] = description

    return render_to_response('home.html',
                              {'products': products},
                              context_instance=RequestContext(request))
