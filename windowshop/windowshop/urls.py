from django.conf.urls import patterns, include, url

from myshop.views import *
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'windowshop.views.home', name='home'),
    # url(r'^windowshop/', include('windowshop.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    url(r'^api$', 'myshop.views.api'),
    url(r'^$', 'myshop.views.myshop')
)
