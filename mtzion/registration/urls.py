from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_all_registrations, BranchViewSet, RegistrationViewSet

router = DefaultRouter()
router.register(r'branches', BranchViewSet)
router.register(r'registrations', RegistrationViewSet)
router.register(r'registrations', get_all_registrations)

urlpatterns = [
    path('', include(router.urls)),
]