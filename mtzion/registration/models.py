from django.db import models
from accounts.models import CustomUser


class Branch(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    grade = models.IntegerField()
    transfer_letter = models.FileField(upload_to="transfer_letters/")
    report_card = models.FileField(upload_to="report_cards/")


class Registration(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[
            ("PENDING", "Pending"),
            ("APPROVED", "Approved"),
            ("DENIED", "Denied"),
        ],
    )


class ReportCardImage(models.Model):
    student = models.ForeignKey(
        Student, related_name="report_card_images", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="report_cards/")
    page_number = models.IntegerField()


class ReportCardPDF(models.Model):
    student = models.OneToOneField(
        Student, related_name="report_card_pdf", on_delete=models.CASCADE
    )
    pdf = models.FileField(upload_to="report_cards/")


class Grade(models.Model):
    name = models.CharField(max_length=50)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="grades")

    def __str__(self):
        return f"{self.name} - {self.branch.name}"


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.branch.name if self.branch else 'No Branch'} - {self.grade.name if self.grade else 'No Grade'}"
