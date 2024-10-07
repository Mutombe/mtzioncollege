from rest_framework import serializers
from .models import Branch, Form, Grade, ReportCardImage, ReportCardPDF, Registration
from rest_framework import serializers
from .models import Grade, Subjects

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "name", "location", "desscription", "image", "students"]

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = ['id', 'name']

class GradeSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Grade
        fields = ["id", "name", "branch", "students_count", "class_hours", "subjects"]

class FormSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)
    class Meta:
        model = Form
        fields = ["id", "name", "branch", "students_count", "class_hours", "subjects"]


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
        model = Registration
        fields = [
            "id",
            "student",
            "branch",
            "grade",
            "form",
            "full_name",
            "date_of_birth",
            "parent_name",
            "contact_number",
            "email",
            "previous_school",
            "last_grade_completed",
            "transfer_letter",
            "birth_certificate",
            "report_card_type",
            "report_card_images",
            "report_card_pdf",
        ]

    def create(self, validated_data):
        report_card_images = validated_data.pop("report_card_images", None)
        report_card_pdf = validated_data.pop("report_card_pdf", None)
        registration = Registration.objects.create(**validated_data)

        if report_card_images:
            for image_data in report_card_images:
                ReportCardImage.objects.create(registration=registration, **image_data)
        elif report_card_pdf:
            ReportCardPDF.objects.create(registration=registration, **report_card_pdf)

        return registration
    
class AdminRegistrationActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['approve', 'deny'])
    admin_notes = serializers.CharField(required=False, allow_blank=True, max_length=500)

    def validate_action(self, value):
        if value not in ['approve', 'deny']:
            raise serializers.ValidationError("Action must be either 'approve' or 'deny'.")
        return value


