from django import forms
from .models import Category


class AddStory (forms.Form):
    title = forms.CharField ( widget=forms.TextInput(attrs={"class":"form-control"}), max_length=150)
    author= forms.CharField (max_length=150, widget=forms.TextInput(attrs={"class":"form-control"}))
    content = forms.CharField(widget=forms.Textarea(attrs={"class":"form-control",
                                                           "rows": 5 }))
    category = forms.ModelChoiceField (empty_label='Choice category', queryset=Category.objects.all (),widget=forms.Select(attrs={"class":"form-control"}),)
