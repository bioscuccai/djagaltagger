import itertools

from django.db import models
from easy_thumbnails.files import get_thumbnailer
from django.utils.html import format_html
from django.db.models import F, Q

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Image(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images')
    tags = models.ManyToManyField(Tag)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)

    def thumbnail_tag(self):
        thumb_options = {'size': (200, 200,)}
        thumb_url = get_thumbnailer(self.image).get_thumbnail(thumb_options).url
        return format_html('<img src="{}">', thumb_url)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pk']

class Category(models.Model):
    name = models.CharField(max_length=255)
    default_status = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Artist(models.Model):
    name = models.CharField(max_length=255)
    prefix = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class ImageRangeManager(models.Manager):
    def grouped_by_page(self, pagination_size):
        page_ranges = super().get_queryset().annotate(page=F('start')/pagination_size+1)

        return itertools.groupby(page_ranges, key=lambda x: x.page)

class ImageRange(models.Model):
    name = models.CharField(max_length=255, null=False, default='')
    start = models.IntegerField(null=False, default=0)
    end = models.IntegerField(null=False, default=0)
    mixed = models.BooleanField(null=False, default=False)
    color = models.CharField(default="#000000", null=False, max_length=255)

    objects = ImageRangeManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['start']
