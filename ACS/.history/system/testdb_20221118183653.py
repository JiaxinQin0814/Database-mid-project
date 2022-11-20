# -*- coding: utf-8 -*-
 
from django.http import HttpResponse
 
from system.models import Teacher_Info
 
# 数据库操作
# def testdb(request):
#     test1 = Teacher_Info(Teacher_Id="66",Teacher_name='runoob')
#     test1.save()
#     return HttpResponse("<p>数据添加成功！</p>")
def testdb(request):
    # 初始化
    response = ""
    response1 = ""
    
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Teacher_Info.objects.all()
        
    # filter相当于SQL中的WHERE，可设置条件过滤结果
    response2 = Teacher_Info.objects.filter(id=1) 
    
    # 获取单个对象
    response3 = Teacher_Info.objects.get(id=1) 
    
    # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    Teacher_Info.objects.order_by('Teacher_name')[0:2]
    
    #数据排序
    Teacher_Info.objects.order_by("Teacher_Id")
    
    # 上面的方法可以连锁使用
    Teacher_Info.objects.filter(name="runoob").order_by("Teacher_Id")
    
    # 输出所有数据
    for var in list:
        response1 += var.name + " "
    response = response1
    return HttpResponse("<p>" + response + "</p>")