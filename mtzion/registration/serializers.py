from rest_framework import serializers
from .models import Branch, Form, Grade, ReportCardImage, ReportCardPDF, Student


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "name", "location", "desscription", "image", "students"]


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ["id", "name"]

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ["id", "name"]


class ReportCardImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportCardImage
        fields = ["image", "page_number"]


class ReportCardPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportCardPDF
        fields = ["pdf"]


class RegistrationSerializer(serializers.ModelSerializer):
    report_card_images = ReportCardImageSerializer(many=True, required=False)
    report_card_pdf = ReportCardPDFSerializer(required=False)

    class Meta:
        model = Student
        fields = [
            "id",
            "user",
            "school",
            "grade",
            "transfer_letter",
            "report_card_type",
            "report_card_images",
            "report_card_pdf",
        ]

    def create(self, validated_data):
        report_card_images = validated_data.pop("report_card_images", None)
        report_card_pdf = validated_data.pop("report_card_pdf", None)
        student = Student.objects.create(**validated_data)

        if report_card_images:
            for image_data in report_card_images:
                ReportCardImage.objects.create(student=student, **image_data)
        elif report_card_pdf:
            ReportCardPDF.objects.create(student=student, **report_card_pdf)

        return student
    
class AdminRegistrationActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['approve', 'deny'])
    admin_notes = serializers.CharField(required=False, allow_blank=True, max_length=500)

    def validate_action(self, value):
        if value not in ['approve', 'deny']:
            raise serializers.ValidationError("Action must be either 'approve' or 'deny'.")
        return value


