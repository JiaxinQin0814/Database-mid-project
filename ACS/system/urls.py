from django.urls import path
from .views import *
from .teacher_views_by_zyq import *

app_name = 'system'
urlpatterns = [
    # path('', views.home, name="主页"),
    # path('home/', views.home, name="首页"),
    path("register/",registerview,name="注册"),
    path('login/', loginView, name="登录"),
    # path("course/",name="不知道")
    # path("course/", loginView, name="登录"),
    path("teacher-course/",TeacherCourseView,name="教师课程库"),
    path("teacher-all-course/",TeacherAllCourseView,name="教师所有课程库"),
    path("introduce/",introduceView,name="introduce"),
    path("peiyangfangan/",peiyangfanganView,name="peiyangfangan"),
    path("course_list/", course_listView, name="course_list"),
    path("loupanchart/", loupanchartView, name="loupanchart"),
    path("course_edit/", course_edit, name="course_edit"),
    path("course_import/", course_import, name="course_import"),
    path("info_edit/", info_edit, name="info_edit"),
    path("database_show/", database_show, name="database_show"),
    path("course_export/", course_export, name="course_export"),
    path("info_import/", info_import, name="info_import")
    # path('welcome/', views.welcome, name="系统主界面"),
    # path('add/', views.add, name="添加信息"),
    # path('delete/', views.delete, name="删除信息"),
    # path('update/', views.update, name="修改信息"),
    # path('select/', views.select, name="查询信息"),
    # path('info/', views.info, name="所有学生信息"),
]
