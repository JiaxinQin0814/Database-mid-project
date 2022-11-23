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
from .models import MyUser
import system.models as models
from django.http import HttpResponse
import xlwt


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
    # 判断请求类型
    user_list = []
    if req.method == "POST":
        form = CourseInsertForm(req.POST)
        if form.is_valid():  # 检查是否符合数据规定
            apply = models.Source_class()

            # 获取表单数据,如果获取不到,则为None
            apply.class_name = req.POST.get("class_name", None)  # 课程名称
            apply.class_Id = req.POST.get("class_Id", None)  # 课程编号
            apply.credit = req.POST.get("credit", None)  # 学分
            apply.using = req.POST.get("using", None)  # 当前是否正在使用
            apply.school = models.School()
            apply.school.school_name = req.POST.get("school", None)  # 开课院系
            apply.character = req.POST.get("character", None)  # 课程性质

            # 将表单数据存到数据库中
            apply.save()

            # 将列表传给模板index.html
            user_dict = {"success": "yes"}
            return render(req, "course_edit.html", user_dict)

        else:
            user_dict = {}
            user_dict["success"] = "no"
            for key, value in form.errors.items():
                user_dict[key] = value[0]
            return render(req, "course_edit.html", user_dict)


from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from .models import Source_class
import xlrd
global key_words
from io import BytesIO


def database_show(request):
    global key_words
    if request.method == "POST":

        class_name = request.POST.get("class_name", None)  # 课程名称
        class_Id = request.POST.get("class_Id", None)  # 课程编号

        credit = request.POST.get("credit", None)  # 学分
        using = request.POST.get("using", None)  # 当前是否正在使用
        school_name = request.POST.get("school", None)  # 开课院系
        character = request.POST.get("character", None)  # 课程性质
        search = dict()
        if class_name:
            search['class_name'] = class_name
        if class_Id:
            search['class_Id'] = class_Id
        if credit:
            search['credit'] = credit
        if using:
            search['using'] = using
        if school_name:
            search['school'] = school_name
        if character:
            search['character'] = character
        key_words = search
    items = Source_class.objects.filter(**key_words).values('class_name', 'class_Id', 'credit', 'using', 'character',
                                                            'school')
    paginator = Paginator(items, 3)
    num_p = request.GET.get('page', 1)
    page = paginator.page(int(num_p))
    return render(request, 'course_list.html', locals())


def course_export(request):   # 数据导出
    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="courses.xls"'

    data = models.Source_class.objects.values_list('class_Id', 'class_name', 'credit', 'using', 'character', 'school')
    if data:
        ws = xlwt.Workbook(encoding='utf-8')
        w = ws.add_sheet("课程")
        w.write(0, 0, u"课程编号")
        w.write(0, 1, u"课程名称")
        w.write(0, 2, u"学分")
        w.write(0, 3, u"是否正在使用")
        w.write(0, 4, u"课程性质")
        w.write(0, 5, u"开课学院")

        # 写入数据
        excel_row = 1
        for item in data:
            print(item[0])
            class_Id = item[0]
            class_name = item[1]
            credit = item[2]
            using = item[3]
            character = item[4]
            school = item[5]
            w.write(excel_row, 0, class_Id)
            w.write(excel_row, 1, class_name)
            w.write(excel_row, 2, credit)
            w.write(excel_row, 3, using)
            w.write(excel_row, 4, character)
            w.write(excel_row, 5, school)
            excel_row += 1
        # 写出到IO
        output = BytesIO()
        ws.save(output)
        output.seek(0)
        response.write(output.getvalue())

        return response


def info_import(request):
    code = 200
    message = []
    print(request.FILES)
    if request.method == "POST":
        # create table object
        course_list = []
        # read file
        # print(request.FILES)  # <MultiValueDict: {}>
        file = request.FILES.get("ExcelFile")
        print(file)
        wb = xlrd.open_workbook(filename=None, file_contents=file.read())
        st = wb.sheets()[0]
        for row in range(2, st.rows+1):
            # read
            course_id = st.cell(row, 1)
            course_name = st.cell(row, 2)
            course_credit = st.cell(row, 3)
            course_inuse = st.cell(row, 4)
            if course_inuse == "是":
                course_inuse = True
            elif course_inuse == "否":
                course_inuse = False
            else:
                code = 500
                message.append("导入文件中”当前是否正在使用“取值必须为”是“或者”否“！")
                break
            course_nature = st.cell(row, 5)
            course_school = st.cell(row, 6)
            # store into table
            course_list.append(Source_class(
                class_Id=course_id,
                class_name=course_name,
                credit=course_credit,
                using=course_inuse,
                character=course_nature,
                school=course_school,
            ))
        # save multiple records
        print(course_list)
        Source_class.objects.bulk_create(course_list)
        if code == 200:
            message.append("成功导入！")
    return render(request, "course_import.html",
                  {"code": code,
                   "message": message,
                   })
