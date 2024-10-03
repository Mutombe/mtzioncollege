from accounts.serializers import UserProfileSerializer
from .models import Branch, Form, Grade, Registration, UserProfile
from .serializers import BranchSerializer, GradeSerializer, RegistrationSerializer, AdminRegistrationActionSerializer, FormSerializer
from rest_framework import viewsets, permissions, status, serializers, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

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
    
class GradeListCreateView(generics.ListCreateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def get_queryset(self):
        branch_id = self.kwargs.get("branch_id")
        if branch_id:
            return Grade.objects.filter(branch__id=branch_id)
        return super().get_queryset()

    def perform_create(self, serializer):
        branch = self.kwargs.get("branch_id")
        try:
            # Get the Property instance
            branch_instance = Branch.objects.get(id=branch)
            # Save the unit with the property instance
            serializer.save(unit_property=branch_instance)
        except Branch.DoesNotExist:
            raise serializers.ValidationError("Branch does not exist.")
        
class FormListCreateView(generics.ListCreateAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    def get_queryset(self):
        branch_id = self.kwargs.get("branch_id")
        if branch_id:
            return Form.objects.filter(branch__id=branch_id)
        return super().get_queryset()

    def perform_create(self, serializer):
        branch = self.kwargs.get("branch_id")
        try:
            # Get the Property instance
            branch_instance = Form.objects.get(id=branch)
            # Save the unit with the property instance
            serializer.save(unit_property=branch_instance)
        except Form.DoesNotExist:
            raise serializers.ValidationError("Branch does not exist.")

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
        if self.action in ['update', 'partial_update', 'admin_action']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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