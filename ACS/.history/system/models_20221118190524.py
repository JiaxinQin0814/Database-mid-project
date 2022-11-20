from tabnanny import verbose
from django.db import models

# Create your models here.

class Teacher_Info(models.Model):
# 2.定义字段 属性
   Teacher_Id = models.AutoField(primary_key=True,verbose_name="职工号")
   Teacher_name = models.CharField(max_length=16, blank=False, verbose_name="教师姓名")
   password = models.CharField(max_length=30, blank=False, verbose_name="密码")
   school = models.CharField(max_length=20,verbose_name="隶属院系")
   school = models.CharField(max_length=20,verbose_name="隶属院系")

   class Meta:
       db_table="Teacher_Information"
       verbose_name="教职工信息"
       verbose_name_plural=verbose_name

class Admin_Info(models.Model):
    Admin_Id = models.AutoField(primary_key=True,verbose_name="职工号")
    Admin_name = models.CharField(max_length=16,blank=False,verbose_name="教务秘书姓名")
    password = models.CharField(max_length=30, blank=False, verbose_name="密码")
    school = models.CharField(max_length=20,verbose_name="隶属院系")
    
    class Meta:
        db_table=""

# class Source_class(models.Model):
    