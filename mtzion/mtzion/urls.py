from django.contrib import admin
from django.urls import include, path
from registration.views import BranchViewSet, RegistrationViewSet, GradeListCreateView, FormListCreateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'branches', BranchViewSet, 'branches')
router.register(r'registrations', RegistrationViewSet, "registrations")
#router.register(r'registrations', get_all_registrations)

urlpatterns = [
    path('admin/', admin.site.urls),
     path('', include(router.urls)),
    path('branches/<int:branch_id>/grades/', GradeListCreateView.as_view(), name='grades'),
    path('branches/<int:branch_id>/forms/', FormListCreateView.as_view(), name='forms'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
