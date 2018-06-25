from rest_framework import views, parsers
from rest_framework.response import Response
from galery.models import Image

from ..serializers import ImageSerializer


class UploadAPIView(views.APIView):
    parser_classes = (parsers.MultiPartParser,)

    def put(self, request):
        image_obj = request.data['image']
        image = Image(image=image_obj)
        image.save()
        return Response(ImageSerializer(image).data)
