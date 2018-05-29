from django.db import models

# Create your models here.

class Tag(models.Model):
  name = models.CharField(max_length=255)

class Image(models.Model):
  title = models.CharField(max_length=255)
  image = models.ImageField(upload_to='images')
  tags = models.ManyToManyField(Tag)
