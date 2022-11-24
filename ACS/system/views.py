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
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Source_class
import system.models as models

from .models import *
import xlrd  # for importing excel


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
                return render(request, 'nav.html', info)
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


def menuview(request):
    if request.method == "GET":
        uid = request.session.get('identifier')
        info = MyUser.objects.values("identifier").filter(identifier=uid).values()[0]

        print(info)
        return render(request, "nav.html", info)
    # else:
    #     globals()


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


def database_show(request):
    print('1')
    items = Source_class.objects.all()
    print(items)
    return render(request, 'course_list.html', {'items': items})


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

            # user = {"课程名称":class_name, "课程编号":class_Id, "学分":credit, "当前是否正在使用":using, "开课院系":school, "课程性质":character}
            # 追加到
            user = {"success": "list"}

            user_list.append(user)
            print(user, user_list)
            # 将列表传给模板index.html
            return render(req, "course_edit.html", {"user_list": user_list})

        else:
            # 取出
            return JsonResponse({"code": 403, "message": "导入失败", "data": {"class_name": form.errors.get("class_name")}})


def info_import(request):
    code = 200
    message = []
    if request.method == "POST":
        # create table object
        course_list = []
        # read file
        # print(request.FILES)  # <MultiValueDict: {}>
        file = request.FILES.get("ExcelFile")
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


def info_update(request):
    """
    参照Source_class表，class_ID是不能修改的，其它都可以。

    传入数据：
    {class_Id: int,  # 要修改的那条记录，必填
     class_name: str,  # 如果要修改就传值，不修改就不传值
     using: bool,  # default=True
     character: int,  # choices
     school: str,
    }
    [[[保证传入数据的数据类型。如果school传入空字符串而不是None，会导致错误。]]]
    [[[如果前端做不了，后端也可以调整]]]

    传出数据：
    {code: int,  # 200 or 500
     message: list,  # list of str
     data: {class_Id: int,
            class_name: str,
            using: bool,
            character: int,
            school: str,
            }  # 修改产生的新记录
    }

    已经用info_edit测试过，功能正常。
    """
    code = 200
    message = []
    data = {}
    if request.method == "POST":
        class_Id = request.POST.get("class_Id", None)
        if class_Id is None:
            code = 500
            message.append("错误：无法获取课程编号（class_Id）！")
        else:
            class_name = request.POST.get("class_name", None)
            credit = request.POST.get("credit", None)
            using = request.POST.get("using", None)
            character = request.POST.get("character", None)
            school = request.POST.get("school", None)

            # 当前数据类型有误
            if school == "":
                school = None

            # traditional update
            # if class_name is not None:
            #     Source_class.objects.filter(class_Id=class_Id).update(class_name=class_name)
            # if credit is not None:
            #     Source_class.objects.filter(class_Id=class_Id).update(credit=credit)
            # if using is not None:
            #     Source_class.objects.filter(class_Id=class_Id).update(using=using)
            # if character is not None:
            #     Source_class.objects.filter(class_Id=class_Id).update(character=character)
            # if school is not None:
            #     Source_class.objects.filter(class_Id=class_Id).update(school=school)


            # create a new record if update...
            # update old record: using = False
            course_st = Source_class.objects.filter(class_Id=class_Id)  # primary key. only one record
            course_st.update(using=False)
            course = course_st[0]
            # save new record
            new_course = Source_class()
            new_course.class_name = class_name if class_name is not None else course.class_name
            new_course.credit = credit if credit is not None else course.credit
            new_course.using = using if using is not None else True  # 考虑业务的话，update的应该都是True
            new_course.character = character if character is not None else course.character
            new_school = School()
            new_school.school_name = school if school is not None else course.school.school_name
            new_course.school = new_school
            new_course.save()
            # relation: old record ----- new record
            history = ClassHistory()
            history.old_class_id = course
            history.new_class_id = new_course
            history.save()

            data = new_course.as_dict()
    else:
        code = 500
        message.append("请传入POST请求！")
    if len(message) == 0:
        message.append("成功修改！")
    return render(request, "course_edit.html",
                  {"code": code,
                   "message": message,
                   "data": data,
                   }
                  )


def teaching_class_insert(request):
    """
    课堂、授课对象生成新的教学班

    传入：
    （都必填）
    [POST]
    {"source_class_name": str,  # 课程名称
     "student_name": list of str,  # 对应MajorClass.name。可以有多个值
     "teaching_class_name": str,  # 教学班名称
     "planned_size": int,  # 计划修读人数
    }

    后端：
    根据课程名称找到对应的课程编号（using=True的情况下应该是one-to-one的）
    根据MajorClass.name找到对应的教学班编号
    根据教学班计算actual_size
    insert新教学班

    传出：
    {code: int,
     message: list of str,
     data:{'id': 7,
         'name': '数据库1班',
         'source_class_id': 14,
         'planned_size': 50,
         'actual_size': 30
         }
    }

    已经自己生成数据测试过，功能正常。注意接口的数据获取就没问题。
    """
    code = 200
    message = []
    data = {}
    for i in range(1):  # only for break
        # ----------judge method-----------
        if request.method != "POST":
            code = 500
            message.append("请传入POST请求！")
            break
        # ----------get data---------------
        source_class_name = request.POST.get("source_class_name", None)
        student_name = request.POST.get("student_name", None)
        teaching_class_name = request.POST.get("teaching_class_name", None)
        planned_size = request.POST.get("planned_size", None)

        # # 自己测试数据
        # source_class_name = "数据库"
        # student_name = ["信息学院2020级1班"]
        # teaching_class_name = "数据库1班"
        # planned_size = 50

        if (source_class_name is None) or (student_name is None) \
                or (teaching_class_name is None) or (planned_size is None):
            code = 500
            message.append("传入数据存在空值！")
            break
        elif (not isinstance(source_class_name, str)) or (not isinstance(student_name, list)) \
                or (not isinstance(teaching_class_name, str)) or (not isinstance(planned_size, int)):
            code = 500
            message.append("传入数据类型有误！")
            break
        # -------------------insert new teaching class------------
        tc = TeachingClass()
        # set course name
        sc = Source_class.objects.filter(class_name=source_class_name, using=True)
        if len(sc) > 1:
            code = 500
            message.append("课程名称“{}”存在{}个使用中的课程！".format(source_class_name, len(sc)))
            break
        elif len(sc) == 0:
            code = 500
            message.append("课程名称“{}”无使用中的课程！".format(source_class_name))
            break
        sc = sc[0]  # QuerySet -> model
        tc.source_class = sc
        # set name
        tc.name = teaching_class_name
        # set planned_size
        tc.planned_size = planned_size
        # set students and actual_size
        try:
            tc.save()  # therefore, tc will have a auto-generated id
        except Exception as e:
            # reason: maybe tc.name already exists
            code = 500
            message.append("{}:{}".format(e.__class__.__name__, e))
            break
        # student_lst = []
        actual_size = 0
        for name in student_name:
            mc = MajorClass.objects.get(name=name)
            actual_size += mc.size
            tc.students.add(mc)
            # student_lst.append(mc)
        # ts_student = tc.students.bulk_create(student_lst)
        # tc.students.set(ts_student)
        tc.actual_size = actual_size
        # insert this record
        try:
            tc.save()  # therefore, tc will have a auto-generated id
        except Exception as e:
            # reason: maybe tc.name already exists
            code = 500
            message.append("{}:{}".format(e.__class__.__name__, e))
            break
        # --------------data--------------
        data = tc.__dict__
        del data["_state"]
    if len(message) == 0:
        message.append("新增教学班成功！")
    # print({"code": code,
    #        "message": message,
    #        "data": data,
    #        })
    return render(request, "course_edit.html",  # 这里的html要改的
                  {"code": code,
                   "message": message,
                   "data": data,
                   })
