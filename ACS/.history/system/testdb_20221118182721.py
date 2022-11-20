# -*- coding: utf-8 -*-
 
from django.http import HttpResponse
 
from system.models import Teacher_Info
 
# 数据库操作
def testdb(request):
from system.models import Teacher_Info
    test1 = (name='runoob')
    test1.save()
    return HttpResponse("<p>数据添加成功！</p>")
