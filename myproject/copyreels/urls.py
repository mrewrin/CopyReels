"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.urls import path, include
from . import views
from .views import RegisterView, CustomEmailConfirmationView, LoginView, PasswordResetConfirmView


urlpatterns = [
                  path('admin/', admin.site.urls),

                  # Главная страница
                  path('', TemplateView.as_view(template_name='index.html'), name='home'),

                  # Страница аккаунта
                  path('account/', views.account_view, name='account'),

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
                  # API маршруты
                  path('api/register/', RegisterView.as_view(), name='api_register'),
                  path('api/login/', LoginView.as_view(), name='api_login'),
                  path('api/reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(),
                       name='api_password_reset_confirm'),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
