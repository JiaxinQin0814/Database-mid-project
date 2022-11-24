from .models import *
from django.shortcuts import render


def TeacherAllCourseView(request):
    if request.method == 'GET':  # 获得数据库数据
        # QueryString查询
        courses = Course.objects.all()  # 返回QuerySite容器对象 类似数组
        print(courses)
        return render(request, "ceshi_course_all.html", locals())
    elif request.method == 'POST':  # 用户提交数据 在本视图中不会用到
        # teacher_id = request.POST('teacher_id')
        # return render(request, "login.html")
        pass
    else:
        pass


def TeacherCourseView(request):
    if request.method == 'GET':  # 获得数据库数据
        # QueryString查询
        identifier = request.POST.get('identifier')  # 教师编号
        classes_teacher = TeacherScheduling.objects.filter(
            teacher=identifier)  # 返回QuerySite容器对象 类似数组
        classes_id = []  # 存储该教师所有的教学班id
        for class_ in classes_teacher:
            classes_id.append(class_.teaching_class_id.id)
        classes_id = list(set(classes_id))
        if not classes_id:  # 如果列表非空
            teaching_classes = TeachingClass.objects.filter(id=classes_id[0])
        if len(classes_id) > 1:
            for num, class_id in enumerate(classes_id, 1):
                teaching_classes_ = TeachingClass.objects.filter(id=class_id)
                teaching_classes = teaching_classes.union(teaching_classes_)
        return render(request, "ceshi_course.html", locals())  # ceshi_course.html还没有写 没法测试
    elif request.method == 'POST':  # 用户提交数据 在本视图中不会用到
        # teacher_id = request.POST('teacher_id')
        # return render(request, "login.html")
        pass
    else:
        pass
