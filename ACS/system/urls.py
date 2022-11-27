from django.urls import path
from .views import *
from .teacher_views_by_zyq import *

app_name = 'system'
urlpatterns = [
    # path('', views.home, name="主页"),
    # path('home/', views.home, name="首页"),
    path("register/", registerview, name="注册"),
    path('login/', loginView, name="登录"),
    # path("course/",name="不知道")
    # path("course/", loginView, name="登录"),
    path("teacher-course/", TeacherCourseView, name="教师课程库"),
    path("teacher-all-course/", TeacherAllCourseView, name="教师所有课程库"),

    path("introduce/", introduce, name="introduce"),
    path("training_program/", training_program, name="training_program"),
    path("course_list/", course_list, name="course_list"),
    path("non_academy_course/", non_academy_course, name="non_academy_course"),
    path("course_class_create/", course_class_create, name="course_class_create"),
    path("academy_course/", academy_course, name="academy_course"),
    path("teacher_comment/", teacher_comment, name="teacher_comment"),

    path("course_insert_view/", course_insert_view, name="course_insert_view"),
    path("course_insert/", course_insert, name="course_insert"),

    path("course_import_view/", course_import_view, name="course_import_view"),
    path("course_import/", course_import, name="course_import"),

    path("course_update_view/", course_update_view, name="course_update_view"),
    path("course_update/", course_update, name="course_update"),

    path("course_query/", course_query, name="course_query"),

    path("course_export/", course_export, name="course_export"),

    path("course_delete/", course_delete, name="course_delete"),

    path("course_delete_batch/", course_delete_batch, name="course_delete_batch"),
    # path('welcome/', views.welcome, name="系统主界面"),
    # path('add/', views.add, name="添加信息"),
    # path('delete/', views.delete, name="删除信息"),
    # path('update/', views.update, name="修改信息"),
    # path('select/', views.select, name="查询信息"),
    # path('info/', views.info, name="所有学生信息"),
    # path("info_edit/", teaching_class_insert, name="teaching_class_insert")  # 仅用于测试，html要改
]
