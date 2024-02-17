"""
    Vistas de la API Rest de eventos
"""
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .serializers import EventSerializer
from .models import Event


# Create your views here.
class EventPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = EventPagination

    def perform_create(self, serializer):
        """
        Asigna el usuario autenticado como creador del evento
        """
        serializer.save(created_by=self.request.user)

    @extend_schema(
        responses={200: EventSerializer}
    )
    @action(detail=False, methods=['get'])
    def created_events(self, request: Request):
        """
        Devuelve los eventos creados por el usuario autenticado
        Args:
            request: Request

        Returns:
            Response con los eventos creados por el usuario autenticado
        """
        user = request.user
        events = Event.objects.filter(created_by=user)

        # Aplicar paginación
        paginator = EventPagination()
        result_page = paginator.paginate_queryset(events, request)

        serializer = EventSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    # Acciones de interaccion de usuarios
    @extend_schema(
        responses={status.HTTP_201_CREATED: dict(status='Subscribed')},
    )
    @action(detail=True, methods=['post'])
    def subscribe(self, request: Request, pk: int = None):
        """
        Suscribir un usuario a un evento
        Args:
            request: Request
            pk: int

        Returns:
            Response con el estado de la suscripción
        """
        event = self.get_object()
        user = request.user

        event.assistants.add(user)
        return Response({'status': 'Subscribed'}, status=status.HTTP_201_CREATED)

    @extend_schema(
        responses={status.HTTP_200_OK: dict(status='Unsubscribed')},
    )
    @action(detail=True, methods=['post'])
    def unsubscribe(self, request: Request, pk: int = None):
        """
        Desuscribir un usuario de un evento
        Args:
            request: Request
            pk: int

        Returns:
            Response con el estado de la desuscripción
        """
        event = self.get_object()
        user = request.user
        event.assistants.remove(user)
        return Response({'status': 'Unsubscribed'}, status=status.HTTP_200_OK)

    @extend_schema(
        responses={200: EventSerializer}
    )
    @action(detail=False, methods=['get'])
    def subscribed_events(self, request: Request):
        """
        Devuelve los eventos a los que el usuario autenticado está suscrito
        Args:
            request: Request

        Returns:
            Response con los eventos a los que el usuario autenticado está suscrito
        """
        user = request.user
        events = Event.objects.filter(assistants=user)

        # Aplicar paginación
        paginator = EventPagination()
        result_page = paginator.paginate_queryset(events, request)

        serializer = EventSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
