from rest_framework import viewsets, mixins
from galery.models import Tag
from ..serializers import TagSerializer

class TagViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    pagination_class = None
