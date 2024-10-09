from accounts.serializers import UserProfileSerializer
from .models import Branch, Form, Grade, Registration, UserProfile
from .serializers import BranchSerializer, GradeSerializer, RegistrationSerializer, AdminRegistrationActionSerializer, FormSerializer
from rest_framework import viewsets, permissions, status, serializers, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .serializers import GradeSerializer


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

@api_view(['GET'])
def get_grade(request, grade_id):
    grade = get_object_or_404(Grade.objects.prefetch_related('subjects'), id=grade_id)
    serializer = GradeSerializer(grade)
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
    permission_classes = [permissions.AllowAny]
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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_grades(request, grade_id):
    grade = get_object_or_404(Grade, id=grade_id)
    request_data = request.data.copy()  # Make a mutable copy of request data
    request_data["grade"] = grade.id

    serializer = RegistrationSerializer(data=request_data, context={"request": request})
    if serializer.is_valid():
        serializer.save(student=request.user)  # Pass student from request
        return Response({"registration_id": serializer.data["id"]}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_forms(request, form_id):
   form = get_object_or_404(Form, id=form_id)
   request_data = request.data.copy()  # Make a mutable copy of request data
   request_data["form"] = form.id

   serializer = RegistrationSerializer(data=request_data, context={"request": request})
   if serializer.is_valid():
        serializer.save(student=request.user)  # Pass customer from request
        return Response({"registration_id": serializer.data["id"]}, status=status.HTTP_201_CREATED)
    
   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def manage_registration(request):
    bookings = Registration.objects.filter(
        unit__unit_property__owner=request.user
    ) | Registration.objects.filter(property__owner=request.user)
    serializer = RegistrationSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_registrations(request):
    bookings = Registration.objects.filter(customer=request.user)
    serializer = RegistrationSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def registration_status(request, registration_id):
    booking = get_object_or_404(Registration, id=registration_id)
    serializer = RegistrationSerializer(booking)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def approve_registration(request, registration_id):
    registration = get_object_or_404(Registration, id=registration_id)
    registration.status = "Approved"
    registration.save()
    return Response({"detail": "Registration Approved."})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def deny_registration(request, registration_id):
    registration = get_object_or_404(Registration, id=registration_id)
    registration.status = "Denied"
    registration.save()
    return Response({"detail": "Registration denied."})


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'admin_action']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    def get_queryset(self):
        user = self.request.user
        print(f"User: {user}, Is superuser: {user.is_superuser}")
        if user.is_superuser:
            queryset = Registration.objects.all()
            print(f"Superuser queryset count: {queryset.count()}")
            return queryset
        queryset = Registration.objects.filter(student=user)
        print(f"Regular user queryset count: {queryset.count()}")
        return queryset
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

