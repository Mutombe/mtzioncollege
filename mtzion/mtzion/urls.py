from django.contrib import admin
from django.urls import include, path
from registration.views import BranchViewSet, RegistrationViewSet, GradeListCreateView, FormListCreateView, get_grade, register_forms, register_grades, approve_registration, deny_registration
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'branches', BranchViewSet, 'branches')
router.register(r'registrations', RegistrationViewSet, "registrations")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('', include('accounts.urls')),
    path('registration', include("registration.urls")),
    path('branches/<int:branch_id>/grades/', GradeListCreateView.as_view(), name='grades'),
    path('branches/<int:branch_id>/forms/', FormListCreateView.as_view(), name='forms'),
    path('grade/<int:grade_id>/', get_grade, name='grade'),
    path('register/<int:grade_id>/', register_grades, name='register_grade'),
    path('register/<int:form_id>/', register_forms, name='register_form'),
    path('approve/<int:registration_id>/', approve_registration, name='approve_reg'),
    path('deny/<int:registration_id>/', deny_registration, name='deny_reg')
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
