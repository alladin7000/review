from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('newpage', views.newpage, name='newpage'),
    path('upload', views.upload, name='upload'),
    path('savechanges', views.editpage, name='savechanges'),
    path('randompage', views.randompage, name='randompage'),
    path('search', views.search, name="search"),
    path('editpage/<str:entry>', views.editpage, name='editpage'),
    path('wiki/<str:entry>', views.entry, name='entry')
]
