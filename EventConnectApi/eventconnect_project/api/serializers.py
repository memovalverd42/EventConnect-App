from rest_framework import serializers
from rest_framework.parsers import MultiPartParser

from .models import Event
from users.models import User

from cloudinary.templatetags import cloudinary
import cloudinary
import cloudinary.uploader
import cloudinary.api

class CreatedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class EventSerializer(serializers.HyperlinkedModelSerializer):
    image_data = serializers.ImageField(write_only=True, required=False)
    created_by = CreatedBySerializer(read_only=True)
    parser_classes = [MultiPartParser]

    class Meta:
        model = Event
        fields = ['id',
                  'name',
                  'date',
                  'location',
                  'description',
                  'image',
                  'image_data',
                  'about',
                  'assistants_count',
                  'created_by']
        read_only_fields = ['id', 'image', 'created_by', 'assistants_count']

    def create(self, validated_data):
        image_data = validated_data.pop('image_data', None)
        if image_data:
            result = cloudinary.uploader.upload(image_data, folder="eventconnect")
            validated_data['image'] = result['secure_url']
        return super().create(validated_data)

    def update(self, instance, validated_data):
        image_data = validated_data.pop('image_data', None)
        if image_data:
            result = cloudinary.uploader.upload(image_data, folder="eventconnect")
            validated_data['image'] = result['secure_url']
        return super().update(instance, validated_data)
