from django.db import models

# Create your models here.

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
