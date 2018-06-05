from django.contrib import admin

# Register your models here.

from .models import Image, Tag, Category, Artist

admin.site.register(Image)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Artist)
