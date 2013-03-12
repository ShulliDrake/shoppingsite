"""MyShop view functions"""
from django.conf import settings
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse

import simplejson
import requests
import urllib


def _get_api_response(request):
    """Call Shopping API"""
    # Get configuration values
    api_key = settings.API_KEY
    base_api = settings.API_PATH
    items_per_page = settings.API_ITEMS_PER_PAGE
    restrict_by = settings.API_RESTRICT_PARAM

    # Check user requested keywords
    raw_keywords = ''
    if request.GET.get('q'):
        raw_keywords = request.GET.get('q', '')
        if isinstance(raw_keywords, unicode):
            keywords = raw_keywords.encode("utf-8", "ignore")
            keywords = urllib.quote_plus(keywords)
    else:
        keywords = settings.DEFAULT_KEYWORDS

    # Price range
    price_min = request.GET.get('min', settings.PRICE_RANGE_MIN)
    price_max = request.GET.get('max', settings.PRICE_RANGE_MAX)
    price_range = settings.API_RESTRICT_PRICE % (price_min, price_max)

    restriction = restrict_by + "," + price_range
    brand = request.GET.get('brand')
    if brand:
        if isinstance(raw_keywords, unicode):
            brand = brand.encode("utf-8", "ignore")
            brand = urllib.quote_plus(brand)
        brand_restrict = settings.API_RESTRICT_BRAND % brand
        restriction = restriction + "," + (settings.API_RESTRICT_BRAND % brand)

    # Get page number
    page = 1
    if request.GET.get('page'):
        page = request.GET.get('page')

    try:
        start_index = items_per_page * int(page)

    except ValueError:
        page = 1
        start_index = items_per_page

    api = base_api % ("US", keywords, start_index, items_per_page)  # county code, query, start index, max results
    api = api + restriction

    r = requests.get(api)

    products = r.json().get('items')
    total_items = r.json().get('totalItems')
    items_per_page = r.json().get('itemsPerPage')

    pagination = _get_pagination(total_items, start_index, items_per_page, page)

    available_brands = None
    if products:
        available_brands = [p.get('product').get('brand') for p in products]
        available_brands = filter(None, sorted(list(set(available_brands))))
            
    """
    if products:
        for p in products:
            description = p.get('product').get('description')
            description = description[:200] + '...'  if len(description) > 200 else description
            p['product']['description'] = description
            """

    search_results = {
        'products': products,
        'pagination': pagination,
        'keywords': raw_keywords,
        'page': page,
        'brands': available_brands
        }

    return search_results


def api(request):
    """Return json application"""
    response = _get_api_response(request)
    return HttpResponse(simplejson.dumps(response), mimetype="application/json")


def myshop(request):

    search_results = _get_api_response(request)

    return render_to_response('home.html',
                              {'keywords': search_results.get('keywords'),
                               'products': search_results.get('products'),
                               'brands': search_results.get('brands'),
                               'pagination': search_results.get('pagination'),
                               'currentPage': int(search_results.get('page'))},
                              
                              context_instance=RequestContext(request))


# Helper functions
def _get_pagination(totalItems, startIndex, itemsPerPage, currentPage):
    """
    """

    if totalItems <= itemsPerPage:
        return None

    # calculate the number of pages to show
    numOfPages = totalItems / itemsPerPage

    pagination = range(1, min(7, numOfPages))
    nextPage = None
    if numOfPages > 7:
        nextPage = int(currentPage) + 1

    return {'pagination':pagination, 'next':nextPage}
