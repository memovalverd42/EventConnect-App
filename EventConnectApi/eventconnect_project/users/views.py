"""
Vistas para la API Rest de Autenticación
"""

from django.contrib.auth import authenticate

from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .models import User
from .serializers import UserRequestSerializer, UserResponseSerializer, UserLoginSerializer, UserTokenRefreshSerializer


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    @extend_schema(
        responses={
            status.HTTP_200_OK: UserResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: dict(error='Invalid credentials')
        },
    )
    def post(self, request: Request):
        """
        ApiView para el login de usuarios
        Args:
            request: Request

        Returns:
            Response con el usuario logueado
        """
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            response_serializer = UserResponseSerializer(user)
            response = response_serializer.data
            response['token'] = {'access': str(refresh.access_token), 'refresh': str(refresh)}
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserRegistrationAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRequestSerializer

    @extend_schema(
        responses={
            status.HTTP_201_CREATED: UserResponseSerializer,
            status.HTTP_400_BAD_REQUEST: dict(error='Bad request')
        },
    )
    def post(self, request: Request):
        """
        ApiView para el registro de usuarios
        Args:
            request: Request

        Returns:
            Response con el usuario registrado
        """
        serializer = UserRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['is_email_verified'] = False
            user: User = serializer.save()

            if user:
                refresh = RefreshToken.for_user(user)
                response_serializer = UserResponseSerializer(user)
                response = response_serializer.data
                response['token'] = {'access': str(refresh.access_token), 'refresh': str(refresh)}
                return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserResponseSerializer

    @extend_schema(
        request=UserTokenRefreshSerializer,
        responses={
            status.HTTP_201_CREATED: UserResponseSerializer,
            status.HTTP_400_BAD_REQUEST: dict(error='Bad request')
        },
    )
    def post(self, request: Request):
        """
        ApiView para refrescar el token de acceso
        Args:
            request: Request

        Returns:
            Response con el nuevo token de acceso
        """
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            user_id = token.payload['user_id']
            user = User.objects.get(id=user_id)

            if user:
                access_token = AccessToken.for_user(user)
                response_serializer = UserResponseSerializer(user)
                response = response_serializer.data
                response['token'] = {'access': str(access_token), 'refresh': str(refresh_token)}
                return Response(response, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
