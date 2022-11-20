from tabnanny import verbose
from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator

# Create your models here.

class School(models.Model):
    school_name = models.AutoField(primary_key=True,verbose_name="学院名称")
    class Meta:
        db_table = "School_Information"
        verbose_name = "院系信息"
        verbose_name_plural=verbose_name
class Major(models.Model):
    major_name = models.AutoField(primary_key=True,verbose_name="专业名称")

class Teacher_Info(models.Model):
   Teacher_Id = models.AutoField(primary_key=True,verbose_name="职工号")
   Teacher_name = models.CharField(max_length=16, blank=False, verbose_name="教师姓名")
   password = models.CharField(max_length=30, blank=False, verbose_name="密码")
   school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="教师所属院系")
       
   class Meta:
       db_table="Teacher_Information"
       verbose_name="教职工信息"
       verbose_name_plural=verbose_name

class Admin_Info(models.Model):
    Admin_Id = models.AutoField(primary_key=True,verbose_name="职工号")
    Admin_name = models.CharField(max_length=16,blank=False,verbose_name="教务秘书姓名")
    password = models.CharField(max_length=30, blank=False, verbose_name="密码")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="教秘所属院系")
    
    class Meta:
        db_table="Admin_Information"
        verbose_name="教务处秘书信息"
        verbose_name_plural=verbose_name

class Source_class(models.Model):
    module = (
        ("TSJY","通识教育"),
        ("ZYJY","专业教育"),
        ("CXYJYSJ","创新研究与实践"),
        ("SJTZYFZZD","素质拓展与发展指导"),
    )
    module2 = (
        ("SXZZLL","思想政治理论课"),
        ("DXWY","大学外语（非英语专业）"),
        ("TSHX","通识核心课"),
        ("GJXXQ","国际小学期全英文课"),
        ("TSJYDJTXLGKJZ","通识教育大讲堂系列公开讲座"),
        ("JDLSZZYD","经典历史著作阅读"),
        ("BLHX","部类核心课"),
        ("ZYHX","专业核心课"),
        ("GXHXX","个性化选修"),
        ("SHYJYCSXL","社会研究与创新训练"),
        ("SHSJYZHFW","社会实践与志愿服务"),
        ("ZYSX","专业实习"),
        ("BYLW","毕业论文"),
        ("ZYSJHD","专业实践活动"),
        ("XSYT","新生研讨课"),
        ("DXTY","大学体育"),
        ("XLJKJY","心理健康教育"),
        ("ZYSYGH","职业生涯规划"),
        ("GFJY","国防教育"),
        ("GGYSJY","公共艺术教育"),
        ("FZZD","发展指导"),
    )
    characters = (
        ("BLJC","部类基础"),
        ("BLGT","部类共同"),
    )
    class_Id = models.AutoField(primary_key=True,verbose_name="课程编号")
    class_name = models.CharField(max_length=20,blank=False,verbose_name="课程名称")
    credit = models.IntegerField(verbose_name="学分",default=2,validators=[MaxValueValidator(20),MinValueValidator(1)])
    using = models.BooleanField(verbose_name="当前是否正在使用")
    character1 = models.CharField(max_length=30,blank=True,choices=module,verbose_name="一级模块")
    character2 = models.CharField(max_length=30,blank=True,choices=module,verbose_name="二级模块")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="开课院系")
    
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
        
        
class major_class(models.Model):
    major_class_id=models.AutoField(primary_key=True,verbose_name="班级编号")
    number = models.IntegerField(default=30,validators=[MaxValueValidator(100),MinValueValidator(0)],verbose_name="班级人数")
    major = models.CharField(max_length=30,verbose_name="专业名称")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="班级所属院系")