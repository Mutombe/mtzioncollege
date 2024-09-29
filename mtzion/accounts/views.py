# accounts/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CustomUser, UserProfile, Branch
from .serializers import CustomUserSerializer, UserProfileSerializer, BranchSerializer
from .permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework_jwt.utils import jwt_decode_handler
from django.contrib.auth import get_user_model


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)


class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class AuthInfoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        User = get_user_model()
        token = request.auth.token
        payload = jwt_decode_handler(token)
        auth0_id = payload["sub"]

        user, created = User.objects.get_or_create(auth0_id=auth0_id)
        if created:
            user.username = payload.get("nickname", "")
            user.email = payload.get("email", "")
            user.save()
            UserProfile.objects.create(user=user)

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
