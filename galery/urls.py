from django.urls import path

from . import views

urlpatterns = [
    path('', views.ImageListView.as_view(), name='index'),
    path('upload', views.UploadView.as_view(), name='upload'),
    path('images/<int:pk>/<str:tag_name>', views.add_tag),
    path('artists/<int:pk>/preview',
         views.artist.artist_preview, name='artist_preview'),
    path('artists/', views.artist.artist_list, name='artist_list'),
    path('difference', views.difference.DifferenceView.as_view(), name='difference')
]
