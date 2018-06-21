from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core import serializers

from rest_framework import viewsets
from ..serializers import ArtistSerializer

from galery.models import Image, Tag, Artist

@login_required
def artist_list(request):
    artists = Artist.objects.all()

    return HttpResponse(serializers.serialize('json', artists), content_type='application/json')


@login_required
def artist_preview(request, pk):
    artist = get_object_or_404(Artist, pk=pk)

    images = Image.objects.filter(image__contains=f'/{artist.prefix}')[:5]

    return HttpResponse(serializers.serialize('json', images))

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    pagination_class = None
