from .models import Payment
from rest_framework import serializers

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'registration', 'amount', 'paid_at']
        read_only_fields = ['paid_at']

    def validate_registration(self, value):
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError("You can only make payments for your own registrations.")
        if value.status != 'APPROVED':
            raise serializers.ValidationError("You can only make payments for approved registrations.")
        return value