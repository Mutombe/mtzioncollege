# accounts/urls.py
from django.urls import path
from .views import Auth0CallbackView

urlpatterns = [
    #path('auth/callback/', Auth0CallbackView.as_view(), name='auth0_callback'),
]