from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import get_user_model
from .forms import *
from django.http import JsonResponse

# User = get_user_model() # 获取User模型

def register(request):
    if request.method == "GET":
        return render(request,"register.html")
    else:
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            email = form.cleaned_data["email"]
            username_exists = User.objects.filter(username=username).exists()
            if username_exists:
            	return JsonResponse({"code":400,"message":"验证失败","data":{"username":"您输入的用户名已存在!","password1":"","password2":"","email":""}})
            email_exists = User.objects.filter(email=email).exists()
            if email_exists:
                return JsonResponse({"code": 400, "message":"验证失败","data":{"username": "","password1":"","password2":"", "email": "您输入的邮箱已存在！"}})
            User.objects.create_user(username=username,password=password,email=email)
            return JsonResponse({"code": 200,"message":"验证通过", "data":{"username": "","password1":"","password2":"", "email": ""}})
        else:
            return JsonResponse({"code":400,"message":"验证失败","data":{"username":form.errors.get("username"),"password1":form.errors.get("password1"),"password2":form.errors.get("password2"),"email":form.errors.get("email")}})

