from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserLoginSerializer(serializers.ModelSerializer):
    """
    Serializer para el login de usuarios
    """

    class Meta:
        model = User
        fields = ('email', 'password')


class UserRequestSerializer(serializers.ModelSerializer):
    """
    Serializer para el registro de usuarios
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class TokenSerializer(serializers.Serializer):
    access = serializers.CharField(max_length=255, read_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)


class UserTokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField(max_length=255, required=True)


class UserResponseSerializer(serializers.ModelSerializer):
    """
    Serializer para la respuesta de los usuarios
    """
    token = TokenSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'token']
