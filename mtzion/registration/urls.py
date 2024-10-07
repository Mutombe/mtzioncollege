from django.urls import path
from .views import get_grade

urlpatterns = [
    path('subjects/<int:grade_id>/', get_grade, name='subjects'),
]