from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, ListView
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core import serializers

from galery.models import Image, Tag, Artist
from .. import forms

def artist_list(request):
  artists = Artist.objects.all()

  return HttpResponse(serializers.serialize('json', artists), content_type='application/json')
