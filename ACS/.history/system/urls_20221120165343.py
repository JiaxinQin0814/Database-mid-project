from django.urls import path
from .views import *


urlpatterns = [
    # path('', views.home, name="主页"),
    # path('home/', views.home, name="首页"),
    path("register/",regiter,name="注册"),
    path('login/', login, name="登录"),
    # path('welcome/', views.welcome, name="系统主界面"),
    # path('add/', views.add, name="添加信息"),
    # path('delete/', views.delete, name="删除信息"),
    # path('update/', views.update, name="修改信息"),
    # path('select/', views.select, name="查询信息"),
    # path('info/', views.info, name="所有学生信息"),
]
