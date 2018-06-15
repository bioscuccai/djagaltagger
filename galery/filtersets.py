from django_filters import rest_framework as filters
from .models import Image, Artist

class ImageFilter(filters.FilterSet):
    tag = filters.CharFilter(name="tags__name")
    artist_id = filters.CharFilter(method='artist_filter')

    class Meta:
        model = Image
        fields = ()

    def artist_filter(self, queryset, name, value):
        artist = None

        try:
            artist = Artist.objects.get(pk=value)
        except Artist.DoesNotExist:
            return Image.objects.none()

        return queryset.filter(image__contains=f'/{ artist.prefix }')
