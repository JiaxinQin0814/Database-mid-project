from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from .form import RegisterForm,LoginForm
User = get_user_model() # 获取User模型

from django.shortcuts import render
from .form import *
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.shortcuts import redirect
from .models import MyUser


# 登录视图名称不能起成login，与自带login函数重名
def loginView(request):
    if request.method == "GET":
        return render(request,"login.html")
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            # remember = int(request.POST.get("remember"))
            user = authenticate(request,username=username,password=password) # 使用authenticate进行登录验证，验证成功会返回一个user对象，失败则返回None
            # 使用authenticate验证时如果is_active为False也会返回None，导致无法判断激活状态，
            # 此时可以在seetings中配置：
            # AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.AllowAllUsersModelBackend']
            if user and user.is_active: # 如果验证成功且用户已激活执行下面代码
                login(request,user) # 使用自带的login函数进行登录，会自动添加session信息
                request.session["username"] = username # 自定义session，login函数添加的session不满足时可以增加自定义的session信息。
                request.session.set_expiry(None) # 设置session过期时间，None表示使用系统默认的过期时间 
                # else:
                #     request.session.set_expiry(0) # 0代表关闭浏览器session失效
                indo
                return render(request, 'nav.html', info)
                # return JsonResponse({"code": 200,"message":"验证通过","data":{ "error":""}})
            elif user and not user.is_active:
                return JsonResponse({"code": 404, "message": "用户未激活", "data": {"error": "该用户还没有激活，请<a href='#'>激活</a>"}})
            else:
                return JsonResponse({"code": 405, "message": "验证失败", "data": {"error": "用户名或密码错误"}})
        else:
            return JsonResponse({"code":406,"message":"用户名或密码格式错误","data":{"error":"用户名或密码错误"}})



def registerview(request):
    if request.method == "GET":
        return render(request,"register.html")
        print(1)
    
    else:
        form = RegisterForm(request.POST)
        if form.is_valid():
            print("成功提交表单！")
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            email = form.cleaned_data["email"]
            kind = form.cleaned_data["kind"]
            username_exists = MyUser.objects.filter(username=username).exists()
            
            if username_exists:
                return JsonResponse({"code":401,"message":"验证失败","data":{"username":"您输入的用户名已存在!","password1":"","password2":"","email":""}})
            else:
                ee=MyUser.objects.filter(email=email).exists()
            if ee:
                return JsonResponse({"code": 402, "message":"验证失败","data":{"username": "","password1":"","password2":"", "email": "您输入的邮箱已存在！"}})
            MyUser.objects.create_user(username=username,password=password,email=email,kind=kind)
            print("创建成功")
            info = MyUser.objects.values("identifier").filter(username=username)[0]
            print("您的职工号为:", info)
            return render(request, 'register.html', info)
            # return JsonResponse({"code": 200,"message":"验证通过", "data":{"username": "","password1":"","password2":"", "email": ""}})
        else:
            return JsonResponse({"code":403,"message":"验证失败","data":{"username":form.errors.get("username"),"password1":form.errors.get("password1"),"password2":form.errors.get("password2"),"email":form.errors.get("email")}})
       
        
# # 视图名不能起成logout
# def logoutView(request):
#     logout(request) # 调用django自带退出功能，会帮助我们删除相关session
#     return redirect(request.META["HTTP_REFERER"])
