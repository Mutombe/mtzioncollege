from .models import Payment
from .serializers import PaymentSerializer
from rest_framework import viewsets, permissions
from registration.models import Registration

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        registration = Registration.objects.get(pk=self.request.data['registration'])
        if registration.user != self.request.user:
            raise permissions.PermissionDenied("You can only pay for your own registration.")
        serializer.save()