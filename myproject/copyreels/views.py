from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, get_user_model
from rest_framework.authtoken.models import Token
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import AllowAny
from .serializers import CustomUserSerializer
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from allauth.account.utils import send_email_confirmation
from allauth.account.views import ConfirmEmailView
from django.shortcuts import redirect


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("Полученные данные:", request.data)  # Вывод данных для отладки
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                # Отправляем письмо с подтверждением
                send_email_confirmation(request, user)
                return Response({'message': 'User created successfully', 'user': serializer.data}, status=status.HTTP_201_CREATED)
        print("Ошибки валидации:", serializer.errors)  # Вывод ошибок валидации
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomEmailConfirmationView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        # Выполнение стандартного подтверждения
        response = super().get(*args, **kwargs)

        # Если подтверждение успешно, перенаправление на кастомную страницу
        if self.object:
            return redirect('/')  # Перенаправление на главную страницу

        # В случае ошибки или недействительной ссылки показать ошибку
        return response


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        User = get_user_model()  # Получаем модель пользователя здесь
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Аутентификация
        user = authenticate(username=user.username, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        User = get_user_model()  # Получаем модель пользователя здесь
        uidb64 = kwargs.get('uidb64')
        token = kwargs.get('token')
        password = request.data.get('password')

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"status": "Password reset successful"})
        else:
            return Response({"error": "Invalid token or user ID"}, status=status.HTTP_400_BAD_REQUEST)

@login_required
def account_view(request):
    return render(request, 'account/account.html')
