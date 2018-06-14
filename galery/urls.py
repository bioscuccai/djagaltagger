from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from . import views

router = routers.DefaultRouter()
router.register('artists', views.artist.ArtistViewSet)
router.register('images', views.image_list.ImageViewSet)
router.register('tags', views.image_list.TagViewSet)
router.register('projects', views.image_list.ProjectViewSet)
router.register('image_ranges', views.image_range.ImageRangeViewSet)

urlpatterns = [
    path('', views.ImageListView.as_view(), name='index'),
    path('upload', views.UploadView.as_view(), name='upload'),
    path('images/<int:pk>/<str:tag_name>', views.add_tag),
    path('artists/<int:pk>/preview',
         views.artist.artist_preview, name='artist_preview'),
    path('artists/', views.artist.artist_list, name='artist_list'),
    path('difference', views.difference.DifferenceView.as_view(), name='difference'),
    path('api/', include(router.urls)),
]
