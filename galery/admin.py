from django.contrib import admin

# Register your models here.

from .models import Image, Tag, Category, Artist, Project, ImageRange


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('pk', 'thumbnail_tag', 'title',)
    list_filter = ('project', 'tags',)
    search_fields = ('title',)


admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Artist)
admin.site.register(Project)
admin.site.register(ImageRange)
