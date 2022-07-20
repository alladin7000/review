from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse
from django.views.generic import ListView
from django.views.generic.detail import DetailView
from .models import Post, Category, Story
from django.db.models import F
from .forms import AddStory
from django.contrib import messages

class History (ListView):
    model = Post
    template_name = 'mysite/history.html'
    context_object_name = 'posts'
    paginate_by = 2

    def get_context_data (self, *, object_list=None, **kwargs):
        context = super ().get_context_data (**kwargs)
        context['title'] = 'History'
        return context


class PostsByCategory (ListView):
    template_name = 'mysite/history.html'
    context_object_name = 'posts'
    paginate_by = 2
    allow_empty = False

    def get_queryset (self):
        return Post.objects.filter (category__slug=self.kwargs['slug'])

    def get_context_data (self, *, object_list=None, **kwargs):
        context = super ().get_context_data (**kwargs)
        context['title'] = Category.objects.get (slug=self.kwargs['slug'])
        return context


def index (request):
    return render (request, 'mysite/index.html')


class GetPost (DetailView):
    model = Post
    template_name = 'mysite/single.html'
    context_object_name = 'post'

    def get_context_data (self, *, object_list=None, **kwargs):
        context = super ().get_context_data (**kwargs)
        self.object.views = F ('views') + 1
        self.object.save ()
        self.object.refresh_from_db ()

        return context


class Search (ListView):
    template_name = 'mysite/history.html'
    context_object_name = 'posts'
    paginate_by = 2

    def get_queryset (self):
        return Post.objects.filter (title__icontains=self.request.GET.get ('q'))

    def get_context_data (self, *, object_list=None, **kwargs):
        context = super ().get_context_data (**kwargs)
        context['s'] = f"q={self.request.GET.get ('q')}&"
        return context


def add_story(request):
    if request.method == 'POST':
        form = AddStory(request.POST)
        if form.is_valid():
            story = Story.objects.create(**form.cleaned_data)
            return redirect('history')
    else:
        form = AddStory()
    return render(request, 'mysite/addstory.html', {'form': form})
