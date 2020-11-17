from django.contrib import admin
from .models import Email


class MailAdmin (admin.ModelAdmin):
    list_display = ('sender','subject', 'body', 'timestamp', 'read', 'archived')
    list_display_links = ('sender',)
    search_fields = ('sender', 'recipients')
    list_editable = ('subject', 'body')


admin.site.register(Email, MailAdmin)
