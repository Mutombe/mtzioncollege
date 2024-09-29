from django.shortcuts import render
from .models import Branch, Grade, Registration
from .serializers import BranchSerializer, GradeSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


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
@permission_classes([IsAuthenticated])
def get_all_registrations(request):
    if request.user.is_staff:
        registrations = Registration.objects.all()
        # Serialize and return registrations
        return Response({"registrations": "..."})
    else:
        return Response({"error": "Not authorized"}, status=403)
