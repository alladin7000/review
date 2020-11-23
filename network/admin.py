from django.contrib import admin
from .models import User,Blogpost,Followingdata,Likes
# Register your models here.
admin.site.register(User)
admin.site.register(Blogpost)
admin.site.register(Followingdata)
admin.site.register(Likes)