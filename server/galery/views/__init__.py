from .upload import *
from .image_list import *
from .artist import *
from .difference import *
from .image_range import *
from .tag import *

from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@ensure_csrf_cookie
@login_required
def frontend(request):
    return render(request, "index.html")
