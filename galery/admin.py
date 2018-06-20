from django.contrib import admin

# Register your models here.

from .models import Image, Tag, Category, Artist, Project, ImageRange


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('pk', 'thumbnail_tag', 'title', 'created_at', 'updated_at',)
    list_filter = ('project', 'tags', 'created_at', 'updated_at',)
    search_fields = ('title', 'created_at', 'updated_at',)


admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Artist)
admin.site.register(Project)
admin.site.register(ImageRange)
