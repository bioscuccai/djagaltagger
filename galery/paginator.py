from rest_framework import pagination
from rest_framework.response import Response

class PaginatorWithSize(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data
        })

class PaginatorWithSizeNoLimit(PaginatorWithSize):
    page_size = None
