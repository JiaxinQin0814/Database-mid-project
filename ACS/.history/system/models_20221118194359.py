from tabnanny import verbose
from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator

# Create your models here.

class Teacher_Info(models.Model):
# 2.定义字段 属性
   Teacher_Id = models.AutoField(primary_key=True,verbose_name="职工号")
   Teacher_name = models.CharField(max_length=16, blank=False, verbose_name="教师姓名")
   password = models.CharField(max_length=30, blank=False, verbose_name="密码")
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
        db_table="Admin_Information"
        verbose_name="教务处秘书信息"
        verbose_name_plural=verbose_name

class Source_class(models.Model):
    module = (
        ("TSJY","通识教育"),
        ("ZYJY","专业教育"),
        ("CXYJYSJ","创新研究与实践"),
        ("SJTZYFZZD","素质拓展与发展指导")
    )
    module2 = (
        ("SXZZLL","思想政治理论课"),
        ("DXWY","大学外语（非英语专业）"),
        
    )
    characters = (
        ("BLJC","部类基础"),
        ()
    )
    class_Id = models.AutoField(primary_key=True,verbose_name="课程编号")
    class_name = models.CharField(max_length=20,blank=False,verbose_name="课程名称")
    credit = models.IntegerField(verbose_name="学分",default=2,validators=[MaxValueValidator(20),MinValueValidator(1)])
    using = models.BooleanField(verbose_name="当前是否正在使用")
    character = models.
    
    class Meta:
        db_table = "Source_class"
        verbose_name = "课程库信息"
        verbose_name_plural=verbose_name

class training_program(models.Model):
    program_Id = models.AutoField(primary_key=True,verbose_name="培养方案编号")
    program_name = models.CharField(max_length=30,blank=False,verbose_name="培养方案名称")
    school = models.CharField(max_length=20,blank=False,verbose_name="学院")
    major = models.CharField(max_length=20,blank=20,verbose_name="专业名称")
    grade = models.CharField(max_length=20,blank=False,verbose_name="年级")
    
    class Meta:
        db_table = "training_program"
        verbose_name = "培养方案信息"
        verbose_name_plural=verbose_name
        
class major_class(models.Model)