import os

from rest_framework import views
from rest_framework.response import Response


class DifferenceAPIView(views.APIView):
    def post(self, request):
        present = os.listdir('static/uploads/images')
        difference = []
        expected = request.data['files'].split('\n')
        difference = set(expected) - set(present)
        return Response(difference)
