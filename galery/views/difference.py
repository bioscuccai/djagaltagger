from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core import serializers
from django.views.generic import View

from galery.models import Image, Tag, Artist
from .. import forms
import os
import djagal.settings

from rest_framework import views
from rest_framework.response import Response

class DifferenceView(View):
    def get(self, request):
        form = forms.DifferenceForm()
        difference = []
        return render(request, 'galery/difference.html', locals())

    def post(self, request):
        present = os.listdir('static/uploads/images')
        form = forms.DifferenceForm(request.POST)
        difference = []
        if form.is_valid():
            expected = form.cleaned_data['files'].split('\n')
            difference = set(expected) - set(present)
        return render(request, 'galery/difference.html', {
            'difference': difference,
            'form': forms.DifferenceForm()
        })

class DifferenceViewSet(views.APIView):
    def post(self, request):
        present = os.listdir('static/uploads/images')
        difference = []
        expected = request.data['files'].split('\n')
        difference = set(expected) - set(present)
        return Response(difference)
