from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, ListView
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from rest_framework import views, parsers
from rest_framework.response import Response
from ..serializers import ImageSerializer

from galery.models import Image, Tag
from .. import forms

import logging

logger = logging.getLogger(__name__)

class UploadViewSet(views.APIView):
    parser_classes = (parsers.MultiPartParser,)

    def put(self, request):
        image_obj = request.data['image']
        image = Image(image=image_obj)
        image.save()
        return Response(ImageSerializer(image).data)
