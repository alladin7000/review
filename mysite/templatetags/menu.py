from django import template
from mysite.models import Category

register = template.Library()


@register.inclusion_tag('mysite/history.html')
def show_menu (menu_class='menu'):
    categories= Category.objects.all()
    return {"categories":categories, "menu_class":menu_class}
