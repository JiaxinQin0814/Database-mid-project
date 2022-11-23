from secrets import choice
from django.forms import Form
from django.forms import fields
from django.core.exceptions import ValidationError

class RegisterForm(Form):
    username = fields.CharField(
        required=True,
        min_length=3,
        max_length=18,
        error_messages={
            "required":"用户名不可以为空！",
            "min_length":"用户名不能低于3位！",
            "max_length":"用户名不能超过18位！"
        }
    )
    password1 = fields.CharField(
        required=True,
        min_length=3,
        max_length=18,
        error_messages={
            "required":"密码不可以空",
            "min_length": "密码不能低于3位！",
            "max_length": "密码不能超过18位！"
        }
    )
    password2 = fields.CharField(required=False)
    email = fields.EmailField(
        required=True,
        error_messages={
            "required":"邮箱不可以为空！"
        },
    )
    kind = fields.CharField(max_length=10,min_length=1,required=True)
    def clean_password2(self):
        if not self.errors.get("password1"):
            if self.cleaned_data["password2"] != self.cleaned_data["password1"]:
                raise ValidationError("您输入的密码不一致，请重新输入！")
            return self.cleaned_data


class LoginForm(Form):
    identifier = fields.CharField(
        required=True,
        min_length=3,
        max_length=18,
        error_messages={
            "required":"账号不可以为空！",
            "min_length":"账号不能低于3位！",
            "max_length":"账号不能超过18位！"
        }
    )
    password = fields.CharField(
        required=True,
        error_messages={
            "required":"密码不可以空",
        }
    )

class CourseInsertForm(Form):
    class_Id = fields.CharField(
        required=True,
        min_length=6,
        max_length=6,
        error_messages={
            "required": "课程号不能为空！",
            "min_length": "课程号必须为6位！",
            "max_length": "课程号必须为6位！"
        }
    )

    class_name = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            "required": "课程名称不能为空！",
            "max_length": "课程名称不能多于20个字！"
        }
    )

    credit = fields.IntegerField(
        required=True,
        max_value=6,
        min_value=1,
        error_messages={
            "required": "学分不能为空！",
            "min_length": "学分最少为1！",
            "max_length": "学分最多为6！"
        }
    )


# def loginView(request):
#     if request.method == "GET":
#         return render(request,"login.html")
#     else:
#         form = LoginForm(request.POST)
#         if form.is_valid():
#             identifier = form.cleaned_data.get("identifier")
#             password = form.cleaned_data.get("password")
#             # remember = int(request.POST.get("remember"))
#             user = authenticate(request,identifier=identifier,password=password)# 使用authenticate进行登录验证，验证成功会返回一个user对象，失败则返回None
#             print(user.username)
#             print(user.kind)
#             print(user.identifier)
#             # 使用authenticate验证时如果is_active为False也会返回None，导致无法判断激活状态，
#             # 此时可以在seetings中配置：
#             # AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.AllowAllUsersModelBackend']
#             if user and user.is_active: # 如果验证成功且用户已激活执行下面代码
#                 login(request,user) # 使用自带的login函数进行登录，会自动添加session信息
#                 request.session["identifier"] = user.identifier # 自定义session，login函数添加的session不满足时可以增加自定义的session信息。
#                 request.session.set_expiry(None) # 设置session过期时间，None表示使用系统默认的过期时间
#                 # else:
#                 #     request.session.set_expiry(0) # 0代表关闭浏览器session失效
#                 info = MyUser.objects.values("identifier").filter(identifier=identifier)[0]
#                 # print(info)
#                 return render(request, 'index.html', info)
#                 # return JsonResponse({"code": 200,"message":"验证通过","data":{ "error":""}})
#                 # return render(request, "welcome.html")
#
#                 # return render(request, "login.html", {'msg': '登陆失败,密码错误'})
#             elif user and not user.is_active:
#                 return render(request, "login.html", {'msg': '登录失败,用户未激活'})
#                 # return JsonResponse({"code": 404, "message": "用户未激活", "data": {"error": "该用户还没有激活，请<a href='#'>激活</a>"}})
#             else:
#                 return render(request, "login.html", {'msg': '登录失败,用户名或密码错误'})
#                 # return JsonResponse({"code": 405, "message": "验证失败", "data": {"error": "用户名或密码错误"}})
#         else:
#             return render(request, "login.html", {'msg': '登录失败,表单错误'})
#             # return JsonResponse({"code":406,"message":"用户名或密码格式错误","data":{"error":"用户名或密码错误"}})
#
#
#
