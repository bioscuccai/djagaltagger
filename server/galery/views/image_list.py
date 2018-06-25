from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters

from galery.models import Image, Tag, Project
from ..filtersets import ImageFilter
from ..paginator import PaginatorWithSize
from ..serializers import ImageSerializer, ProjectSerializer, AddTagSerializer


class ImageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_class = ImageFilter
    filter_backends = (filters.DjangoFilterBackend,)
    pagination_class = PaginatorWithSize

    @action(methods=['POST'], detail=True)
    def add_tag(self, request, pk=None):
        image = self.get_object()
        serializer = AddTagSerializer(data=request.data)
        if serializer.is_valid():
            tag_name = serializer.data['tag']
            tag, _ = Tag.objects.get_or_create(name=tag_name)

            if len(image.tags.filter(pk=tag.pk)) is 0:
                image.tags.add(tag)
            return Response({"status": "ok"})
        return Response({"status": "not ok"})


class ProjectViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
