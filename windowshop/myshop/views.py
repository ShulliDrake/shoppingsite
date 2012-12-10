"""MyShop view functions"""
from django.shortcuts import render_to_response
from django.template import RequestContext


def myshop(request):

    return render_to_response('home.html',
                              {},
                              context_instance=RequestContext(request))
