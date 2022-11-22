from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from .form import RegisterForm, LoginForm

User = get_user_model()  # 获取User模型

from django.shortcuts import render
from .form import *
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.shortcuts import redirect
from .models import *
import system.models as models

# 登录视图名称不能起成login，与自带login函数重名
def loginView(request):
    if request.method == "GET":
        return render(request, "login.html")
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            identifier = form.cleaned_data.get("identifier")
            password = form.cleaned_data.get("password")
            # remember = int(request.POST.get("remember"))
            user = authenticate(request, identifier=identifier,
                                password=password)  # 使用authenticate进行登录验证，验证成功会返回一个user对象，失败则返回None
            print(user.username)
            print(user.kind)
            print(user.identifier)
            # 使用authenticate验证时如果is_active为False也会返回None，导致无法判断激活状态，
            # 此时可以在seetings中配置：
            # AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.AllowAllUsersModelBackend']
            if user and user.is_active:  # 如果验证成功且用户已激活执行下面代码
                login(request, user)  # 使用自带的login函数进行登录，会自动添加session信息
                request.session["identifier"] = user.identifier  # 自定义session，login函数添加的session不满足时可以增加自定义的session信息。
                request.session.set_expiry(None)  # 设置session过期时间，None表示使用系统默认的过期时间
                # else:
                #     request.session.set_expiry(0) # 0代表关闭浏览器session失效
                info = MyUser.objects.values("identifier").filter(identifier=identifier)[0]
                # print(info)
                return render(request, 'index.html', info)
                # return JsonResponse({"code": 200,"message":"验证通过","data":{ "error":""}})
                # return render(request, "welcome.html")

                # return render(request, "login.html", {'msg': '登陆失败,密码错误'})
            elif user and not user.is_active:
                return render(request, "login.html", {'msg': '登录失败,用户未激活'})
                # return JsonResponse({"code": 404, "message": "用户未激活", "data": {"error": "该用户还没有激活，请<a href='#'>激活</a>"}})
            else:
                return render(request, "login.html", {'msg': '登录失败,用户名或密码错误'})
                # return JsonResponse({"code": 405, "message": "验证失败", "data": {"error": "用户名或密码错误"}})
        else:
            return render(request, "login.html", {'msg': '登录失败,表单错误'})
            # return JsonResponse({"code":406,"message":"用户名或密码格式错误","data":{"error":"用户名或密码错误"}})


def registerview(request):
    if request.method == "GET":
        return render(request, "register.html")

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
                return JsonResponse({"code": 401, "message": "验证失败",
                                     "data": {"username": "您输入的用户名已存在!", "password1": "", "password2": "",
                                              "email": ""}})
            else:
                ee = MyUser.objects.filter(email=email).exists()
            if ee:
                return JsonResponse({"code": 402, "message": "验证失败",
                                     "data": {"username": "", "password1": "", "password2": "", "email": "您输入的邮箱已存在！"}})
            MyUser.objects.create_user(username=username, password=password, email=email, kind=kind)
            print("创建成功")
            info = MyUser.objects.values("identifier").filter(username=username)[0]
            print("您的职工号为:", info)
            return render(request, 'register.html', info)
            # return JsonResponse({"code": 200,"message":"验证通过", "data":{"username": "","password1":"","password2":"", "email": ""}})
        else:
            return JsonResponse({"code": 403, "message": "验证失败", "data": {"username": form.errors.get("username"),
                                                                          "password1": form.errors.get("password1"),
                                                                          "password2": form.errors.get("password2"),
                                                                          "email": form.errors.get("email")}})


def feedback(request):
    if request.method == "GET":
        return render()


def TeacherAllCourseView(request):
    if request.method == 'GET': #获得数据库数据
        #QueryString查询
        courses = Source_class.objects.all() #返回QuerySite容器对象 类似数组
        print(courses)
        return render(request, "ceshi_course_all.html",locals())
    elif request.method == 'POST': #用户提交数据 在本视图中不会用到
        #teacher_id = request.POST('teacher_id')
        #return render(request, "login.html")
        pass
    else:
        pass

def TeacherCourseView(request):
    if request.method == 'GET':  # 获得数据库数据
        # QueryString查询
        identifier = request.POST('identifier') #教师编号
        classes_teacher = teaching_class_teacher_time_assignment.objects.filter(teacher_id = identifier)  # 返回QuerySite容器对象 类似数组
        classes_id = [] #存储该教师所有的教学班id
        for class_ in classes_teacher:
            classes_id.append(class_.teaching_class_id_id)
        classes_id = list(set(classes_id))
        if not classes_id:#如果列表非空
            teaching_classes = teaching_class.objects.filter(teaching_class_id = classes_id[0])
        if len(classes_id)>1:
            for num,class_id in enumerate(classes_id,1):
                teaching_classes_ = teaching_class.objects.filter(teaching_class_id = class_id)
                teaching_classes = teaching_classes.union(teaching_classes_)
        return render(request, "ceshi_course.html", locals())#ceshi_course.html还没有写 没法测试
    elif request.method == 'POST':  # 用户提交数据 在本视图中不会用到
        # teacher_id = request.POST('teacher_id')
        # return render(request, "login.html")
        pass
    else:
        pass



# # 视图名不能起成logout
def logoutView(request):
    logout(request)  # 调用django自带退出功能，会帮助我们删除相关session
    return redirect(request.META["HTTP_REFERER"])


def introduceView(request):
    return render(request, "introduce.html", )
    # else:
    #     globals()


def peiyangfanganView(request):
    return render(request, "peiyangfangan.html", )


def course_listView(request):
    return render(request, "course_list.html", )


def loupanchartView(request):
    return render(request, "loupanchart.html", )


def course_edit(request):
    return render(request, "course_edit.html", )


def course_import(request):
    return render(request, "course_import.html", )


# 功能：获得表单，加入到数据库中去
def info_edit(req):
    #判断请求类型
    user_list = []
    if req.method == "POST":
        form = CourseInsertForm(req.POST)
        if form.is_valid():  # 检查是否符合数据规定
            apply = models.Source_class()

            #获取表单数据,如果获取不到,则为None
            apply.class_name = req.POST.get("class_name", None)  # 课程名称
            apply.class_Id = req.POST.get("class_Id", None)  # 课程编号
            apply.credit = req.POST.get("credit", None)  # 学分
            apply.using = req.POST.get("using", None)   # 当前是否正在使用
            apply.school = models.School()
            apply.school.school_name = req.POST.get("school", None)   # 开课院系
            apply.character = req.POST.get("character", None)  # 课程性质

            # 将表单数据存到数据库中
            apply.save()

            # user = {"课程名称":class_name, "课程编号":class_Id, "学分":credit, "当前是否正在使用":using, "开课院系":school, "课程性质":character}
            # 追加到
            user = {"success": "list"}

            user_list.append(user)
            print(user, user_list)
            # 将列表传给模板index.html
            return render(req, "course_edit.html", {"user_list": user_list})

        else:
            # 取出
            return JsonResponse({"code":403, "message":"导入失败", "data":{"class_name":form.errors.get("class_name")}})



from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage
from .models import Source_class



def database_show(request):
    print('1')
    items = Source_class.objects.all()
    print(items)
    return render(request, 'course_list.html', {'items': items})