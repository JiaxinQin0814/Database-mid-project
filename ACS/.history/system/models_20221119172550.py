from calendar import FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY
from socketserver import ThreadingUnixDatagramServer
from stat import S_IXOTH
from tabnanny import verbose
from tkinter.tix import Balloon
# from time import clock_settime
from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
from enum import Enum

# Create your models here.
class User(models.Model):
    attribute = (
        ("teacher","教师"),
        ("admin","教秘")
    )
    id=models.AutoField(primary_key=True,null=False) 
    name = models.CharField(max_length=20,unique=True) #用户名（职工号）
    password = models.CharField(max_length=20)
    kind = models.CharField(max_length=10,choices=attribute,default="教师")
    c_time= models.DateTimeField(auto_now_add=True)    
    last_updated_time=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    class Meta:
        ordering=['c_time']
        db_table = "User"
        verbose_name = "用户"
        verbose_name_plural=verbose_name

class School(models.Model):
    school_name = models.CharField(max_length=30,primary_key=True,verbose_name="学院名称")
    class Meta:
        db_table = "School_Information"
        verbose_name = "院系信息"
        verbose_name_plural=verbose_name
    def __str__(self):
        return self.school_name
        
class Major(models.Model):
    major_name = models.CharField(max_length=30,primary_key=True,verbose_name="专业名称")
    class Meta:
        db_table ="Major_Information"
        verbose_name = "专业信息"
        verbose_name_plural=verbose_name
    
    def __str__(self):
        return self.major_name

class TC(models.Model):
    # id = models.AutoField(primary_key=True)
    Week = models.IntegerField(verbose_name="周次",validators=[MaxValueValidator(20),MinValueValidator(1)])
    class Weekday(models.IntegerChoices):
        MONDAY =1,"星期一"
        TUESDAY=2,"星期二"
        WEDNESDAY=3,"星期三"
        THURSDAY=4,"星期四"
        FRIDAY=5,"星期五"
        SATURDAY=6,"星期六"
        SUNDAY=7,"星期日"
    weekday = models.PositiveSmallIntegerField(
        choices=Weekday.choices,
        default=Weekday.MONDAY
    )
    class JIEKE(models.IntegerChoices):
        First_class=1,"第一大节(8:00-9:30)"
        Second_class=2,"第二大节(10:00-11:30)"
        Third_class=3,"第三大节(12:00-13:30)"
        Forth_class=4,"第四大节(14:00-15:30)"
        Fifth_class=5,"第五大节(16:00-17:30)"
        Six_class=6,"第六大节(18:00-19:30)"
        Seventh_class=7,"第七大节(19:40-21:10)"
    jieke = models.PositiveSmallIntegerField(
        choices=JIEKE.choices,
        default=JIEKE.First_class
    )
    class Meta:
        db_table = "Time_Information"
        unique_together = (("Week","weekday","jieke"),)
        verbose_name = "上课时间信息"
        verbose_name_plural=verbose_name
    def __str__(self):
        return "第%s周的%s,具体时间%s"%(self.Week,self.weekday,self.jieke)

class Big_Lei(models.Model):
    Big_Lei_name = models.AutoField(primary_key=True,verbose_name="大类名称")
    class Meta:
        db_table = "Big_Lei_Information"
        verbose_name = "大类信息"
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.Big_Lei_name

class Teacher_Info(models.Model):
    id = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,verbose_name="教师编号")
    Teacher_Id = models.CharField(max_length=30,unique=True,verbose_name="职工号")
    Teacher_name = models.CharField(max_length=16, blank=False, verbose_name="教师姓名")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="教师所属院系")
        
    class Meta:
       db_table="Teacher_Information"
       verbose_name="教职工信息"
       verbose_name_plural=verbose_name
    def __str__(self):
        return "%s(%s)"%(self.Teacher_name,self.Teacher_Id)

class Ad_Info(models.Model):
    id = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,verbose_name="教秘编号")
    Admin_Id = models.CharField(max_length=30,verbose_name="职工号",unique=True)
    Admin_name = models.CharField(max_length=16,blank=False,verbose_name="教务秘书姓名")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="教秘所属院系")
    
    class Meta:
        db_table="Admin_Information"
        verbose_name="教务处秘书信息"
        verbose_name_plural=verbose_name
    def __str__(self):
        

class Source_class(models.Model):
    class module1(models.IntegerChoices):
        TSJY =1,"通识教育"
        ZYJY=2,"专业教育"
        CXYJYSJ=3,"创新研究与实践"
        SJTZYFZZD=4,"素质拓展与发展指导"

    class module2(models.IntegerChoices):
        SXZZLL=1,"思想政治理论课"
        DXWY=2,"大学外语（非英语专业）"
        TSHX=3,"通识核心课"
        GJXXQ=4,"国际小学期全英文课"
        TSJYDJTXLGKJZ=5,"通识教育大讲堂系列公开讲座"
        JDLSZZYD=6,"经典历史著作阅读"
        BLHX=7,"部类核心课"
        ZYHX=8,"专业核心课"
        GXHXX=9,"个性化选修"
        SHYJYCSXL=10,"社会研究与创新训练"
        SHSJYZHFW=11,"社会实践与志愿服务"
        ZYSX=12,"专业实习"
        BYLW=13,"毕业论文"
        ZYSJHD=14,"专业实践活动"
        XSYT=15,"新生研讨课"
        DXTY=16,"大学体育"
        XLJKJY=17,"心理健康教育"
        ZYSYGH=18,"职业生涯规划"
        GFJY=19,"国防教育"
        GGYSJY=20,"公共艺术教育"
        FZZD=21,"发展指导"
        
    class characters(models.IntegerChoices):
        BLJC=1,"部类基础"
        BLGT=2,"部类共同"
    
    class_Id = models.AutoField(primary_key=True,verbose_name="课程编号")
    class_name = models.CharField(max_length=20,blank=False,verbose_name="课程名称")
    credit = models.IntegerField(verbose_name="学分",default=2,validators=[MaxValueValidator(20),MinValueValidator(1)])
    using = models.BooleanField(verbose_name="当前是否正在使用")
    character1 = models.PositiveSmallIntegerField(blank=True,choices=module1.choices,default=module1.ZYJY,verbose_name="一级模块")
    character2 = models.PositiveSmallIntegerField(blank=True,choices=module2.choices,default=module2.SXZZLL,verbose_name="二级模块")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="school_class_relation",verbose_name="开课院系")
    
    
    class Meta:
        db_table = "Source_class"
        verbose_name = "课程库信息"
        verbose_name_plural=verbose_name
        unique_together=(("class_Id"),)

class GGrade(models.IntegerChoices):
    A = 1,"2018级"
    B = 2,"2019级"
    C = 3,"2020级"
    D = 4,"2021级"
    E = 5,"2022级"
    
class training_program(models.Model):
    program_Id = models.AutoField(primary_key=True,verbose_name="培养方案编号")
    program_name = models.CharField(max_length=30,blank=False,verbose_name="培养方案名称")
    school = models.ManyToManyField(School,verbose_name="培养方案所属学院")
    major = models.ForeignKey(Major,on_delete=models.CASCADE,related_name ="major_program_relation",verbose_name="专业对应培养方案")
    grade = models.PositiveSmallIntegerField(choices=GGrade.choices,default=GGrade.C,blank=False,verbose_name="年级")
    
    class Meta:
        db_table = "training_program"
        verbose_name = "专业培养方案信息"
        verbose_name_plural=verbose_name
 
class major_class(models.Model):
    major_class_id=models.AutoField(primary_key=True,verbose_name="班级编号")
    grade = models.PositiveSmallIntegerField(choices=GGrade.choices,default=GGrade.C,blank=False,verbose_name="年级")
    number = models.IntegerField(default=30,validators=[MaxValueValidator(100),MinValueValidator(0)],verbose_name="班级人数")
    # major = models.ForeignKey(Major,null=True,blank=True,on_delete=models.CASCADE,related_name="class_belong_to_major",verbose_name="班级所属专业")
    # Big_Lei = models.ForeignKey(Major,null=True,blank=True,on_delete=models.CASCADE,related_name="class_belong_dalei",verbose_name="班级所属大类")
    school =models.ForeignKey(School,null=True,blank=True,on_delete=models.CASCADE,related_name="class_belong_school",verbose_name="班级所属院系")
    program = models.ForeignKey(training_program,null=True,blank=True,on_delete=models.CASCADE,related_name="class_belong_to_programe",verbose_name="班级所属培养方案")
    # belongs_to_a_major = models.BooleanField(blank=False,default=True,verbose_name="是大类还是专业") # 如果是True 就是一个专业，否则是一个大类
    class Meta:
        db_table = "major_class_Information"
        verbose_name = "班级信息"
        verbose_name_plural=verbose_name

class teaching_class(models.Model):
    source_class1 = models.ForeignKey(Source_class,on_delete=models.CASCADE,related_name="teaching_class_source_class",verbose_name="教学班对应课程")
    teaching_class_id =models.AutoField(primary_key=True,verbose_name="教学班id")
    planned_number = models.IntegerField(verbose_name="计划修读人数",default=0,validators=[MaxValueValidator(500),MinValueValidator(0)]) # 计划修读人数由教秘指定
    true_number = models.IntegerField(verbose_name="开课面向人数（即授课对象的人数之和）",default=0)
    students = models.ManyToManyField(major_class,verbose_name="授课对象",null=True,blank=True)
    class Meta:
        db_table = "teaching_class"
        verbose_name = "教学班信息"
        verbose_name_plural = verbose_name

# class Building(models.Model):
#     name = models.TextField(max_length=20,default='公共教学一楼',verbose_name="教学楼名称")
#     class Meta:
#         db_table="Buildings"
#         verbose_name = "教学楼信息"
#         verbose_name_plural=verbose_name
        
# class Classroom(models.Model):
#     id = models.AutoField(primary_key=True,verbose_name="教室编号")
#     place = models.ForeignKey(Building,null=True,blank=True,on_delete=models.CASCADE,related_name="location",verbose_name="教室所在教学楼")
#     is_engine_room = models.BooleanField(verbose_name="是否机房",default=False,blank=False)
#     Capacity = models.IntegerField(verbose_name="教室容量",default=0)
#     class Meta:
#         db_table = "Classroom"
#         verbose_name = "教室信息"
#         verbose_name_plural = verbose_name

# # class CourseSchedule(models.Model):
    
# class teaching_class_classroom_time_assignment(models.Model):
#     relation_id = models.AutoField(primary_key=True,verbose_name="关系编号")
#     teaching_id = models.ForeignKey(teaching_class,on_delete=models.CASCADE,related_name="relation-teachingid",verbose_name="教学班",blank=False)
#     time = models.ForeignKey(TC,blank=False,on_delete=models.CASCADE,related_name="relation-time",verbose_name="教学班上课时间")
#     classroom_id = models.ForeignKey(Classroom,on_delete=models.CASCADE,blank=True,related_name="relation-classroomid",verbose_name="教学班使用的教室")
#     # def __str__(self):
#     #     cl = Classroom.objects.get(id=self.classroom_id)
#     #     tc = teaching_class.objects.get(teaching_class_id=self.teaching_id)
#     #     ti = TC.objects.get()

# class teaching_class_teacher_time_assignment(models.Model):
#     relation_id = models.AutoField(primary_key=True,verbose_name="教学班-教师-时间关系")
#     teaching_class_id  = models.ForeignKey(teaching_class,on_delete=models.CASCADE,related_name="relation-teachingid",verbose_name="教学班",blank=False)
#     time = models.ForeignKey(TC,blank=True,on_delete=models.CASCADE,related_name="relation-time",verbose_name="教学班上课时间")
#     teacher = models.ForeignKey(Teacher_Info,blank=False,on_delete=models.CASCADE,related_name="teaching_class_teacher_relation",verbose_name="教学班对应老师")


    