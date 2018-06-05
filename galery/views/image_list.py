from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, ListView
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from galery.models import Image, Tag, Artist, Category
from .. import forms

import logging

logger = logging.getLogger(__name__)


class ImageListView(LoginRequiredMixin, ListView):
    model = Image
    context_object_name = 'images'
    paginate_by = 40

    def get_queryset(self):
        queries = {}
        if 'tag' in self.request.GET:
            queries['tags__name'] = self.request.GET['tag']

        if 'artist_id' in self.request.GET:
            artist = get_object_or_404(Artist, pk=int(self.request.GET['artist_id']))
            queries['image__contains'] = f'/{ artist.prefix }'

        if ('tag' not in self.request.GET) and ('artist_id' not in self.request.GET):
            return super().get_queryset()

        return Image.objects.filter(**queries)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        context['last_tag'] = self.request.session.get('last_tag', '')
        context['artists'] = Artist.objects.all()
        context['categories'] = Category.objects.all()

        return context


@csrf_exempt
@login_required
def add_tag(request, pk, tag_name):
    tag = None
    image = get_object_or_404(Image, pk=pk)

    tag, _ = Tag.objects.get_or_create(name=tag_name)

    if len(image.tags.filter(pk=tag.pk)) is 0:
        image.tags.add(tag)

    request.session['last_tag'] = tag_name

    return JsonResponse({'status': 'ok'})
