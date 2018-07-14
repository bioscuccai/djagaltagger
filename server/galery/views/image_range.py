from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

from galery.models import ImageRange
from ..filtersets import ImageRangeFilter

from ..serializers import ImageRangeSerializer


class ImageRangeViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ImageRange.objects.all()
    serializer_class = ImageRangeSerializer
    filter_class = ImageRangeFilter
    pagination_class = None

    @action(methods=['GET'], detail=False)
    def suggest_color(self, request):
        return Response()

    @action(methods=['GET'], detail=False)
    def autocomplete_name(self, request):
        if not request.query_params.get('prefix'):
            return Response([])

        image_ranges = ImageRange.objects.filter(name__startswith=request.query_params['prefix'])
        return Response([ImageRangeSerializer(image_range).data for image_range in image_ranges])
