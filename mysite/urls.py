from django.urls import path
from .views import*
from .views import GetPost
urlpatterns = [
    path ('', index, name = 'home'),
    path ('history', History.as_view(),   name = 'history'),
    path('category/<str:slug>/', PostsByCategory.as_view(), name='category'),
    path('single/<slug:slug>/', GetPost.as_view(), name='post'),
    path('search/', Search.as_view(), name ='search'),
    path('addstory', add_story, name ='addstory'),
]