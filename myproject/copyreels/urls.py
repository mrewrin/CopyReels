from django.conf import settings
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.urls import path, re_path, include
from .views import (
    RegisterView,
    CustomEmailConfirmationView,
    LoginView,
    PasswordResetConfirmView,
    process_video,
    check_task_status,
    account_view  # Добавлено для ясности
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API маршруты
    path('api/register/', RegisterView.as_view(), name='api_register'),
    path('api/login/', LoginView.as_view(), name='api_login'),
    path('api/reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(),
         name='api_password_reset_confirm'),
    path('api/process_video/', process_video, name='process_video'),
    path('api/check_task_status/<str:task_id>/', check_task_status, name='check_task_status'),

    # Страница аккаунта
    path('account/', account_view, name='account'),

    # URL для allauth
    path('accounts/confirm-email/<str:key>/', CustomEmailConfirmationView.as_view(),
         name='account_confirm_email'),
    path('accounts/', include('allauth.urls')),

    # Password reset
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    # Password change
    path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(),
         name='password_change_done'),

    # Главная страница
    path('', TemplateView.as_view(template_name='index.html'), name='home'),

    # Этот маршрут должен быть последним
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
