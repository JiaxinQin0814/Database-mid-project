from django.db import models

# Create your models here.
class UserInfo(models.Model):
# 2.定义字段 属性
   UserId = models.AutoField(primary_key=True)
   username = models.CharField(max_length=16, blank=False, verbose_name="用户名")
   password = models.CharField(max_length=16, blank=False, verbose_name="密码")
   
# 创建学生信息类python manage.py makemigrations

class StuInfo(models.Model):
   id = models.AutoField(primary_key=True)
   stuname = models.CharField(max_length=16, verbose_name="学生姓名")
   stuphone = models.CharField(max_length=16, verbose_name="学生电话")
   stuaddress = models.CharField(max_length=16, verbose_name="学生地址")
   stucollege = models.CharField(max_length=16, verbose_name="学生院系")
   stumajor = models.CharField(max_length=16, verbose_name="学生专业")
   

