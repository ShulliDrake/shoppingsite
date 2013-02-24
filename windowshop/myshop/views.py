"""MyShop view functions"""
from django.conf import settings
from django.shortcuts import render_to_response
from django.template import RequestContext

import requests
import urllib


def myshop(request, keywords=None, page=1):

    # Get configuration values
    api_key = settings.API_KEY
    base_api = settings.API_PATH
    items_per_page = settings.API_ITEMS_PER_PAGE
    start_index = items_per_page * int(page)

    # Check user requested keywords
    raw_keywords = ''
    if request.GET.get('q'):
        raw_keywords = request.GET.get('q', '')
        if isinstance(raw_keywords, unicode):
            keywords = raw_keywords.encode("utf-8", "ignore")
            keywords = urllib.quote_plus(keywords)
    else:
        keywords = "pink+flower"

    api = base_api % ("US", keywords, start_index, items_per_page)  # county code, query, start index, max results

    r = requests.get(api)

    products = r.json().get('items')
    total_items = r.json().get('totalItems')
    items_per_page = r.json().get('itemsPerPage')

    pagination = _get_pagination(total_items, start_index, items_per_page)

    """
    if products:
        for p in products:
            description = p.get('product').get('description')
            description = description[:200] + '...'  if len(description) > 200 else description
            p['product']['description'] = description
            """
    return render_to_response('home.html',
                              {'keywords': raw_keywords,
                               'products': products,
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
