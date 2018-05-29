from django.contrib import admin

# Register your models here.

from .models import Image, Tag, Category

admin.site.register(Image)
admin.site.register(Tag)
admin.site.register(Category)