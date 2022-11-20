from django.db import models

# Create your models here.

class Teachernfo(models.Model):
# 2.定义字段 属性
   Teacher_Id = models.AutoField(primary_key=True,verbose_name="职工号")
   Teacher_name = models.CharField(max_length=16, blank=False, verbose_name="教师姓名")
   password = models.CharField(max_length=16, blank=False, verbose_name="密码")
   school = models.CharField(max_length=20,)