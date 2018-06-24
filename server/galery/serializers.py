from rest_framework import serializers
from .models import Artist, Image, Tag, Project, ImageRange

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('pk', 'name', 'prefix', )

#class ImageSerializer(serializers.HyperlinkedModelSerializer):
class ImageSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    image = serializers.FileField(use_url=False)

    class Meta:
        model = Image
        fields = ('pk', 'title', 'tags', 'project', 'image', 'thumbnail_url',)

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', )

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('name', )

class ImageRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageRange
        fields = ('pk', 'start', 'end', 'name', 'mixed', 'color',)

class AddTagSerializer(serializers.Serializer):
    tag = serializers.CharField()

    class Meta:
        fields = ('tag',)

class UploadSerializer(serializers.Serializer):
    image = serializers.ImageField()

    class Meta:
        fields = ('image',)

class DifferenceSerializer(serializers.Serializer):
    class Meta:
        fields = ('files',)
