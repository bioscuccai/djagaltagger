from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, ListView
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from galery.models import Image, Tag
from . import forms

import logging

logger = logging.getLogger(__name__)

def index(request):
  return HttpResponse('response')

class ImageListView(ListView):
  model = Image
  context_object_name = 'images'
  paginate_by = 20

  def get_queryset(self):
    if 'tag' in self.request.GET:
      return Image.objects.filter(tags__name=self.request.GET['tag'])
    else:
      return super().get_queryset()

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['tags'] = Tag.objects.all()

    return context

class UploadView(View):
  def get(self, request):
    form = forms.UploadForm()
    logger.error('uplaod page')
    return render(request, 'galery/upload.html', {'form': form})

  def post(self, request):
    form = forms.UploadForm(request.POST, request.FILES)
    if form.is_valid():
      for f in request.FILES.getlist('images'):
        print('image')
        image = Image(image=f)
        image.save()
    else:
      print('invalid form')
    return redirect('/upload')

@csrf_exempt
def add_tag(request, pk, tag_name):
  tag = None
  image = get_object_or_404(Image, pk=pk)

  tag, _ = Tag.objects.get_or_create(name=tag_name)

  if len(image.tags.filter(pk=tag.pk)) is 0:
    image.tags.add(tag)

  return JsonResponse({'status': 'ok'})
