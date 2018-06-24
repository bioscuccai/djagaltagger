from django_filters import rest_framework as filters
from .models import Image, Artist

class ImageFilter(filters.FilterSet):
    tag = filters.CharFilter(name="tags__name")
    artist_id = filters.CharFilter(method='artist_filter')
    filename_pattern = filters.CharFilter(method="filename_pattern_filter")

    class Meta:
        model = Image
        fields = ()

    def artist_filter(self, queryset, name, value):
        artist = None

        try:
            artist = Artist.objects.get(pk=value)
        except Artist.DoesNotExist:
            return Image.objects.none()

        return queryset.filter(image__contains='/' + artist.prefix)

    # name="image__regex" doesn't work
    def filename_pattern_filter(self, queryset, name, value):
        return queryset.filter(image__regex=value)