from django.shortcuts import render

def home(request):
    return render(request, 'home.html')  # Это отдельный шаблон для главной страницы
