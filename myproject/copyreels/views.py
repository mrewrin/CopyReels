import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
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
from .models import VideoProcessResult
from .scade_integration import process_video_task, download_audio
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt


logger = logging.getLogger(__name__)


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
    def get(self, request, *args, **kwargs):
        # Выполнение стандартного подтверждения
        self.object = self.get_object()
        if self.object:
            self.object.confirm(self.request)
            self.object.email_address.user.is_active = True
            self.object.email_address.user.save()
            return redirect('http://127.0.0.1:8000/')

            # Если хотите перенаправить пользователя на React страницу
            # return redirect('/email-confirmed')

        # В случае ошибки или недействительной ссылки показать ошибку
        return JsonResponse({'status': 'error', 'message': 'Invalid confirmation link'}, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        User = get_user_model()
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
        else:
            print(f"Authentication failed for user: {email}")  # Добавить отладочную информацию
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def process_video(request):
    logger.info("Received process_video request")

    # Log the request data for debugging
    logger.info(f"Request data: {request.data}")

    try:
        video_url = request.data.get('video_url')  # Получаем URL из тела запроса
        user_info = request.data.get('user_info')
        user_info = user_info or 'Unknown'

        # Логгирование полученных данных
        logger.info(f"Extracted URL: {video_url}")
        logger.info(f"Extracted User Info: {user_info}")

        # Запуск асинхронной задачи
        task = process_video_task.delay(video_url, user_info)
        logger.info(f"Started task with ID: {task.id}")
        if not task:
            logger.error("Failed to create Celery task.")
            return Response({'error': 'Failed to create task'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        logger.error(f"Error processing video: {e}")
        return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_task_status(request, task_id):
    logger.info(f"Проверка статуса задачи с ID: {task_id}")
    task_result = process_video_task.AsyncResult(task_id)

    if task_result.state == 'SUCCESS':
        # Получаем результат задачи (словарь с Transcribation и Rewriting)
        result = task_result.result
        logger.info(f"Задача {task_id} успешно завершена.")
        return Response({
            'Transcribation': result.get('Transcribation', ''),
            'Rewriting': result.get('Rewriting', ''),
            'status': 'completed'
        }, status=status.HTTP_200_OK)

    elif task_result.state == 'PENDING':
        logger.info(f"Задача {task_id} в процессе выполнения.")
        return Response({'status': 'pending'}, status=status.HTTP_202_ACCEPTED)

    elif task_result.state == 'FAILURE':
        logger.error(f"Задача {task_id} завершилась с ошибкой: {task_result.info}")
        return Response({'status': 'failed', 'error': str(task_result.info)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        logger.info(f"Неизвестное состояние задачи {task_id}: {task_result.state}")
        return Response({'status': task_result.state}, status=status.HTTP_200_OK)
