from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

from . import views

router = routers.DefaultRouter()
router.register('artists', views.artist.ArtistViewSet)
router.register('images', views.image_list.ImageViewSet)
router.register('tags', views.tag.TagViewSet)
router.register('projects', views.image_list.ProjectViewSet)
router.register('image_ranges', views.image_range.ImageRangeViewSet)

urlpatterns = [
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('api/', include(router.urls)),
    path('api/upload/', views.upload.UploadAPIView.as_view()),
    path('api/differences/', views.difference.DifferenceAPIView.as_view()),
    path('', views.frontend)
]
