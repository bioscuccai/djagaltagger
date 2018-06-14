from rest_framework import viewsets, mixins

from galery.models import ImageRange

from ..serializers import ImageRangeSerializer

class ImageRangeViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ImageRange.objects.all()
    serializer_class = ImageRangeSerializer

