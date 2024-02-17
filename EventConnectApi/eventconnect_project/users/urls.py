from django.urls import path

from .views import UserLoginAPIView, UserRegistrationAPIView,RefreshTokenView


urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('refresh/', RefreshTokenView.as_view(), name='user-refresh-token'),
]
