from django.db import models
from django.urls import reverse


class Category (models.Model):
    title = models.CharField (max_length=500)
    slug = models.SlugField (max_length=500, verbose_name='url', unique=True)

    def __str__ (self):
        return self.title

    def get_absolute_url (self):
        return reverse ('category', kwargs={"slug": self.slug})

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['title']


class Post (models.Model):
    title = models.CharField (max_length=500)
    slug = models.SlugField (max_length=500, verbose_name='url', unique=True)
    author = models.CharField (max_length=500)
    content = models.TextField (blank=True)
    created_at = models.DateTimeField (auto_now_add=True, verbose_name='Date')
    photo = models.ImageField (upload_to='photos/%Y/%m/%d', blank=True)
    views = models.IntegerField (default=0, verbose_name='number of views')
    category = models.ForeignKey (Category, on_delete=models.PROTECT, related_name='posts')
    email = models.EmailField (blank=True, )
    phone = models.CharField (max_length=50, blank=True)

    def __str__ (self):
        return self.title

    def get_absolute_url (self):
        return reverse ('category', kwargs={"pk": self.pk})

    class Meta:
        ordering = ['-created_at']


class Story (models.Model):
    title = models.CharField (max_length=500)
    author = models.CharField (max_length=500)
    content = models.TextField (blank=True)
    created_at = models.DateTimeField (auto_now_add=True, verbose_name='Date')
    category = models.ForeignKey (Category, on_delete=models.PROTECT, related_name='news')


    def __str__ (self):
        return self.title

    class Meta:
        ordering = ['-created_at']
