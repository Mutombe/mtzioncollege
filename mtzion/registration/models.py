from django.db import models
from accounts.models import CustomUser


class Branch(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    students = models.IntegerField(default=0)
    desscription = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="", blank=True, null=True)

    def __str__(self):
        return self.name


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    grade = models.IntegerField()
    transfer_letter = models.FileField(upload_to="transfer_letters/")
    report_card = models.FileField(upload_to="report_cards/")


class Form(models.Model):
    name = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="forms")

    def __str__(self):
        return f"{self.name} - {self.branch.name}"


class Grade(models.Model):
    name = models.CharField(max_length=50)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="grades")

    def __str__(self):
        return f"{self.name} - {self.branch.name}"


class Registration(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("DENIED", "Denied"),
    ]
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="registrations", null=True
    )
    form = models.ForeignKey(Form, on_delete=models.CASCADE, null=True, blank=True)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, null=True, blank=True)
    branch = models.ForeignKey("Branch", on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    admin_notes = models.TextField(blank=True, null=True)
    transfer_letter = models.FileField(upload_to="transfer_letters/", null=True)
    report_card_type = models.CharField(
        max_length=20, choices=[("PDF", "PDF"), ("IMAGES", "Images")], default="IMAGES"
    )


class ReportCardImage(models.Model):
    registration = models.ForeignKey(
        Registration, related_name="report_card_images", on_delete=models.CASCADE, null=True
    )
    image = models.ImageField(upload_to="report_cards/")
    page_number = models.IntegerField()


class ReportCardPDF(models.Model):
    registration = models.OneToOneField(
        Registration, related_name="report_card_pdf", on_delete=models.CASCADE, null=True
    )
    pdf = models.FileField(upload_to="report_cards/")


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True)
    form = models.ForeignKey(Form, on_delete=models.SET_NULL, null=True, blank=True)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.branch.name if self.branch else 'No Branch'} - {self.form.name if self.form else 'No Form'} - {self.grade.name if self.grade else 'No Grade'}"
