from django.contrib import admin
from django.urls import include, path
from registration.views import BranchViewSet, RegistrationViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'branches', BranchViewSet, 'branches')
router.register(r'registrations', RegistrationViewSet, "registrations")
#router.register(r'registrations', get_all_registrations)

urlpatterns = [
    path('admin/', admin.site.urls),
     path('', include(router.urls)),
    #path('branch/', BranchViewSet.as_view(), name='branch'),
]
