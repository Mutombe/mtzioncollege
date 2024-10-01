from django.shortcuts import render

from accounts.serializers import UserProfileSerializer
from .models import Branch, Grade, Registration, UserProfile
from .serializers import BranchSerializer, GradeSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Registration
from .serializers import RegistrationSerializer, AdminRegistrationActionSerializer

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_admin
    
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)

class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=["GET"])
    def grades(self, request, pk=None):
        branch = self.get_object()
        grades = Grade.objects.filter(branch=branch)
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_all_registrations(request):
    if request.user.is_staff:
        registrations = Registration.objects.all()
        # Serialize and return registrations
        return Response({"registrations": "..."})
    else:
        return Response({"error": "Not authorized"}, status=403)

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return Registration.objects.all()
        return Registration.objects.filter(user=user)
    


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'admin_action']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return Registration.objects.all()
        return Registration.objects.filter(user=user)

    @action(detail=True, methods=['post'])
    def admin_action(self, request, pk=None):
        registration = self.get_object()
        serializer = AdminRegistrationActionSerializer(data=request.data)
        
        if serializer.is_valid():
            action = serializer.validated_data['action']
            admin_notes = serializer.validated_data.get('admin_notes', '')
            
            if action == 'approve':
                registration.status = 'APPROVED'
            elif action == 'deny':
                registration.status = 'DENIED'
            
            registration.admin_notes = admin_notes
            registration.save()
            
            return Response({'status': 'registration updated'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)