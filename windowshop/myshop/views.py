"""MyShop view functions"""
from django.conf import settings
from django.shortcuts import render_to_response
from django.template import RequestContext

import requests


def myshop(request, page=1):

    api_key = settings.API_KEY
    base_api = settings.API_PATH
    items_per_page = settings.API_ITEMS_PER_PAGE
    start_index = items_per_page * int(page)
    api = base_api % ("US", "preserved+flower", start_index)  # county code, query


    print api
    r = requests.get(api)
    products = r.json.get('items')
    total_items = r.json.get('totalItems')
    items_per_page = r.json.get('itemsPerPage')

    pagination = _get_pagination(total_items, start_index, items_per_page)
    print pagination

    if products:
        for p in products:
            description = p.get('product').get('description')
            description = description[:200] + '...'  if len(description) > 200 else description
            p['product']['description'] = description

    return render_to_response('home.html',
                              {'products': products,
                               'pagination': pagination,
                               'currentPage': int(page)},
                              context_instance=RequestContext(request))


# Helper functions
def _get_pagination(totalItems, startIndex, itemsPerPage):
    """
    """

    if totalItems <= itemsPerPage:
        return None

    # calculate the number of pages to show
    numOfPages = totalItems / itemsPerPage

    return range(1, min(16, numOfPages))
