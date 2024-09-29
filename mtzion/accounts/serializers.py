# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser, UserProfile, Branch
from registration.serializers import BranchSerializer, GradeSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "is_admin"]
        read_only_fields = ["id", "is_admin"]


class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    branch = BranchSerializer(read_only=True)
    grade = GradeSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ["id", "user", "branch", "grade"]


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "is_admin"]
        read_only_fields = ["id", "is_admin"]


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "name"]
