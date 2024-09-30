from django.db import models
from accounts.models import CustomUser
from registration.models import Registration

class Payment(models.Model):
    registration = models.OneToOneField(Registration, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_at = models.DateTimeField(auto_now_add=True)