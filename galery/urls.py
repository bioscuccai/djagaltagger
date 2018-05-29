from django.urls import path

from . import views

urlpatterns = [
  path('', views.ImageListView.as_view(), name='index'),
  path('upload', views.UploadView.as_view(), name='upload'),
  path('images/<int:pk>/<str:tag_name>', views.add_tag)
]
