from calendar import FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY
from secrets import choice
from tabnanny import verbose
from tkinter import CASCADE
# from socketserver import ThreadingUnixDatagramServer
# from stat import S_IXOTH
# from tabnanny import verbose
# from tkinter.tix import Balloon
# from time import clock_settime
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from enum import Enum
from django.contrib.auth.models import BaseUserManager, AbstractUser

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models.signals import post_save  # 导入post_save信号
from django.dispatch import receiver  # 导入receiver监听信号


# Create your models here.

# --------------------------------user--------------------------------

class UserManager(BaseUserManager):
    def _create_user(self, username, password, email, **kwargs):
        if not username:
            raise ValueError("请传入用户名！")
        if not password:
            raise ValueError("请传入密码！")
        if not email:
            raise ValueError("请传入邮箱地址！")
        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, username, password, email, **kwargs):
        kwargs['is_superuser'] = False
        return self._create_user(username, password, email, **kwargs)

    def create_superuser(self, username, password, email, **kwargs):
        kwargs['is_superuser'] = True
        kwargs['is_staff'] = True
        return self._create_user(username, password, email, **kwargs)


class School(models.Model):
    school_name = models.CharField(max_length=30, primary_key=True, verbose_name="学院名称")

    class Meta:
        db_table = "School"
        verbose_name = "学院"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.school_name


class MyUser(AbstractUser):
    objects = UserManager()
    # identifier = models.CharField(max_length=30, primary_key=True, null=False)
    identifier = models.AutoField(unique=True, verbose_name="职工编号", primary_key=True)
    email = models.EmailField(verbose_name="邮箱")
    school = models.ForeignKey(School, null=True, blank=True, on_delete=models.CASCADE, related_name="teacher_school",
                               verbose_name="职工所属学院")
    attribute = (
        ("teacher", "教师"),
        ("admin", "教秘")
    )
    username = models.CharField(max_length=16, blank=False, verbose_name="职工姓名")
    kind = models.CharField(max_length=10, choices=attribute, default="教师", verbose_name="用户类别")

    USERNAME_FIELD = 'identifier'  # 使用authenticate验证时使用的验证字段，可以换成其他字段，但验证字段必须是唯一的，即设置了unique=True
    REQUIRED_FIELDS = ["username", 'email', "kind"]  # 创建用户时必须填写的字段，除了该列表里的字段还包括password字段以及USERNAME_FIELD中的字段
    EMAIL_FIELD = 'email'  # 发送邮件时使用的字段

    def __str__(self):
        return self.username

    class Meta:
        # ordering=['c_time']
        db_table = "User"
        verbose_name = "用户"
        verbose_name_plural = verbose_name


class Teacher(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)

    class Meta:
        db_table = "Teacher"
        verbose_name = "教师"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "%s" % self.user


@receiver(post_save, sender=MyUser)  # 监听到post_save事件且发送者是User则执行create_extension_user函数
def create_extension_user(sender, instance, created, **kwargs):
    """
    sender:发送者
    instance:save对象
    created:是否是创建数据
    """
    if created:
        # 如果创建对象，ExtensionUser进行绑定
        if instance.kind == "教师":
            Teacher.objects.create(user=instance)
    # else:
    #     # 如果不是创建对象，同样将改变进行保存
    #     instance.extension.save()


class Admin(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)

    class Meta:
        db_table = "Admin"
        verbose_name = "教务处秘书"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "%s" % self.user


@receiver(post_save, sender=MyUser)  # 监听到post_save事件且发送者是User则执行create_extension_user函数
def create_extension_user(sender, instance, created, **kwargs):
    """
    sender:发送者
    instance:save对象
    created:是否是创建数据
    """
    if created:
        # 如果创建对象，ExtensionUser进行绑定
        if instance.kind == "教秘":
            Admin.objects.create(user=instance)
    # else:
    #     # 如果不是创建对象，同样将改变进行保存
    #     instance.extension.save()


# -----------------------------course----------------------------
class Course(models.Model):
    # class module1(models.IntegerChoices):
    #     TSJY = 1, "通识教育"
    #     ZYJY = 2, "专业教育"
    #     CXYJYSJ = 3, "创新研究与实践"
    #     SJTZYFZZD = 4, "素质拓展与发展指导"
    #
    # class module2(models.IntegerChoices):
    #     SXZZLL = 1, "思想政治理论课"
    #     DXWY = 2, "大学外语（非英语专业）"
    #     TSHX = 3, "通识核心课"
    #     GJXXQ = 4, "国际小学期全英文课"
    #     TSJYDJTXLGKJZ = 5, "通识教育大讲堂系列公开讲座"
    #     JDLSZZYD = 6, "经典历史著作阅读"
    #     BLHX = 7, "部类核心课"
    #     ZYHX = 8, "专业核心课"
    #     GXHXX = 9, "个性化选修"
    #     SHYJYCSXL = 10, "社会研究与创新训练"
    #     SHSJYZHFW = 11, "社会实践与志愿服务"
    #     ZYSX = 12, "专业实习"
    #     BYLW = 13, "毕业论文"
    #     ZYSJHD = 14, "专业实践活动"
    #     XSYT = 15, "新生研讨课"
    #     DXTY = 16, "大学体育"
    #     XLJKJY = 17, "心理健康教育"
    #     ZYSYGH = 18, "职业生涯规划"
    #     GFJY = 19, "国防教育"
    #     GGYSJY = 20, "公共艺术教育"
    #     FZZD = 21, "发展指导"

    class Nature(models.TextChoices):
        BLJC = "部类基础", "部类基础"
        BLGT = "部类共同", "部类共同"
        DXTY = "大学体育", "大学体育"
        DXWY = "大学外语", "大学外语"
        FZL = "法政类", "法政类"
        FZZD = "发展指导", "发展指导"
        GFJY = "国防教育", "国防教育"
        GGJSJ = "公共计算机", "公共计算机"
        GGSX = "公共数学", "公共数学"
        GGYSJY = "公共艺术教育", "公共艺术教育"
        GLL = "管理类", "管理类"
        GXHXX = "个性化选修", "个性化选修"
        HYLKZ = "汉语类课程", "汉语类课程"
        JBSZ = "基本素质", "基本素质"
        JDLSZZYD = "经典历史著作阅读", "经典历史著作阅读"
        JJL = "经济类", "经济类"
        JZSJHJ = "集中实践环节", "集中实践环节"
        KXKZYXX = "跨学科专业选修", "跨学科专业选修"
        GJXXQQYWK = "国际小学期全英文课", "国际小学期全英文课"
        KYYSJ = "科研与实践环节", "科研与实践环节"
        LGL = "理工类", "理工类"
        QXGTK = "全校共同课", "全校共同课"
        QXXX = "全校选修", "全校选修"
        RWSJ = "人文素质", "人文素质"
        RWYSL = "人文艺术类", "人文艺术类"
        SQXX = "暑期学校", "暑期学校"
        SXZZLLK = "思想政治理论课", "思想政治理论课"
        TSHSK = "通识核心课", "通识核心课"
        ZYHXK = "专业核心课", "专业核心课"
        ZYSX = "专业实习", "专业实习"
        LDJY = "劳动教育", "劳动教育"
        ZYSYGH = "职业生涯规划", "职业生涯规划"
        ZYJCK = "专业基础课", "专业基础课"
        ZYXX = "专业选修", "专业选修"
        DLGT = "大类共同", "大类共同"
        TSJZ = "通识讲座", "通识讲座"
        CXYJYSJ = "创新研究与实践", "创新研究与实践"
        TSJCK = "通识基础课", "通识基础课"
        XKJC = "学科基础", "学科基础"
        XKTS = "学科通识", "学科通识"
        XLJKJY = "心理健康教育", "心理健康教育"
        XSYTK = "新生研讨课", "新生研讨课"
        YSJY = "艺术教育", "艺术教育"
        YYJC = "应用基础", "应用基础"
        ZJGK = "中国概况", "中国概况"
        ZRKX = "自然科学", "自然科学"
        ZYBX = "专业必修", "专业必修"

    id = models.AutoField(primary_key=True, verbose_name="课程编号", unique=True)
    name = models.CharField(max_length=20, blank=False, verbose_name="课程名称")
    credit = models.IntegerField(verbose_name="学分", default=2, validators=[MaxValueValidator(20), MinValueValidator(1)])
    using = models.BooleanField(verbose_name="当前是否正在使用")
    # character1 = models.PositiveSmallIntegerField(blank=True,choices=module1.choices,default=module1.ZYJY,verbose_name="一级模块")
    # character2 = models.PositiveSmallIntegerField(blank=True,choices=module2.choices,default=module2.SXZZLL,verbose_name="二级模块")
    nature = models.TextField(blank=True, choices=Nature.choices, default=Nature.ZYHXK,
                              verbose_name="课程性质")
    # character = models.TextChoices(choices=characters.choices.l,default=characters.ZYHXK,verbose_name="课程性质")
    school = models.ForeignKey(School, null=True, blank=True, on_delete=models.CASCADE,
                               related_name="school_class_relation", verbose_name="开课院系")

    def as_dict(self):
        return {
            "class_name": self.name,
            "class_id": self.id,
            "credit": self.credit,
            "using": self.using,
            "character": self.nature,
            "school": self.school,
        }

    # 是否要加入老师？ 如果加入老师的话 就可以吧后面的 教学班教师时间表改成教师时间表... 算了先这样吧23333 如果这里你们写的时候觉得很丑就在群里说一下我们统一改

    class Meta:
        db_table = "Course"
        verbose_name = "课程库信息"
        verbose_name_plural = verbose_name
        unique_together = (("id"),)

    def __str__(self):
        return "%s(%s)" % (self.name, self.id)


# 当前课程的历史记录对应的表
class CourseHistory(models.Model):
    history_id = models.AutoField(primary_key=True, verbose_name="修改记录编号", unique=True)
    old_class_id = models.ForeignKey(Course, null=False, blank=False, on_delete=models.CASCADE,
                                     related_name="old_class_id", verbose_name="修改前的课程编号")
    new_class_id = models.ForeignKey(Course, null=False, blank=False, on_delete=models.CASCADE,
                                     related_name="new_class_id", verbose_name="修改后的课程编号")

    class Meta:
        db_table = "ClassHistory"
        verbose_name = "课程库修改历史"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "[{}]{}->{}".format(self.history_id, self.old_class_id, self.new_class_id)


# ----------------------------major-----------------------------
class Major(models.Model):
    name = models.CharField(max_length=30, primary_key=True, verbose_name="专业名称")
    is_a_big_lei = models.BooleanField(verbose_name="是否大类", default=False)

    class Meta:
        db_table = "Major"
        verbose_name = "专业"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


# ---------------------------program-------------------------
class GGrade(models.IntegerChoices):
    A = 1, "2018级"
    B = 2, "2019级"
    C = 3, "2020级"
    D = 4, "2021级"
    E = 5, "2022级"


class Program(models.Model):
    id = models.AutoField(primary_key=True, verbose_name="编号")
    name = models.CharField(max_length=30, blank=False, verbose_name="名称")
    school = models.ManyToManyField(School, verbose_name="学院")
    major = models.ForeignKey(Major, on_delete=models.CASCADE, related_name="major_program_relation",
                              verbose_name="专业")
    grade = models.PositiveSmallIntegerField(choices=GGrade.choices, default=GGrade.C, blank=False, verbose_name="年级")

    class Meta:
        db_table = "program"
        verbose_name = "培养方案"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


# ------------------------Teaching Class----------------
class MajorClass(models.Model):
    id = models.AutoField(primary_key=True, verbose_name="编号")
    name = models.CharField(verbose_name="名称", max_length=30, unique=True)
    # grade = models.PositiveSmallIntegerField(choices=GGrade.choices, default=GGrade.C, blank=False, verbose_name="年级")
    size = models.IntegerField(default=30, validators=[MaxValueValidator(100), MinValueValidator(0)],
                               verbose_name="人数")
    # major = models.ForeignKey(Major,null=True,blank=True,on_delete=models.CASCADE,related_name="class_belong_to_major",verbose_name="班级所属专业")
    # Big_Lei = models.ForeignKey(Major,null=True,blank=True,on_delete=models.CASCADE,related_name="class_belong_dalei",verbose_name="班级所属大类")
    # school = models.ForeignKey(School, null=True, blank=True, on_delete=models.CASCADE,
    #                            related_name="class_belong_school", verbose_name="班级所属院系")
    program = models.ForeignKey(Program, null=True, blank=True, on_delete=models.CASCADE,
                                related_name="class_belong_program", verbose_name="所属培养方案")

    # belongs_to_a_major = models.BooleanField(blank=False,default=True,verbose_name="是大类还是专业") # 如果是True 就是一个专业，否则是一个大类
    class Meta:
        db_table = "MajorClass"
        verbose_name = "专业班级"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class TeachingClass(models.Model):
    id = models.AutoField(primary_key=True, verbose_name="教学班编号")
    name = models.CharField(verbose_name="名称", max_length=64, unique=True)
    source_class = models.ForeignKey(Course, on_delete=models.CASCADE,
                                     related_name="teaching_class_source_class", verbose_name="课程")
    students = models.ManyToManyField(MajorClass, verbose_name="授课对象", null=True, blank=True)
    planned_size = models.IntegerField(verbose_name="计划修读人数", default=0,
                                       validators=[MaxValueValidator(500), MinValueValidator(0)])  # 计划修读人数由教秘指定
    # true_number = models.IntegerField(verbose_name="开课面向人数（即授课对象的人数之和）", default=0)
    actual_size = models.IntegerField(verbose_name="实际修读人数", default=0)

    class Meta:
        db_table = "TeachingClass"
        verbose_name = "教学班"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "%s(教学班编号%s)" % (self.source_class, self.id)


# --------------------------------scheduling----------------------

class TC(models.Model):
    # id = models.AutoField(primary_key=True)
    Week = models.IntegerField(verbose_name="周次", validators=[MaxValueValidator(20), MinValueValidator(1)])

    class Weekday(models.IntegerChoices):
        MONDAY = 1, "星期一"
        TUESDAY = 2, "星期二"
        WEDNESDAY = 3, "星期三"
        THURSDAY = 4, "星期四"
        FRIDAY = 5, "星期五"
        SATURDAY = 6, "星期六"
        SUNDAY = 7, "星期日"

    weekday = models.PositiveSmallIntegerField(
        choices=Weekday.choices,
        default=Weekday.MONDAY
    )

    # 节次
    class JieCi(models.IntegerChoices):
        First_class = 1, "第一大节(8:00-9:30)"
        Second_class = 2, "第二大节(10:00-11:30)"
        Third_class = 3, "第三大节(12:00-13:30)"
        Forth_class = 4, "第四大节(14:00-15:30)"
        Fifth_class = 5, "第五大节(16:00-17:30)"
        Six_class = 6, "第六大节(18:00-19:30)"
        Seventh_class = 7, "第七大节(19:40-21:10)"

    jie_ci = models.PositiveSmallIntegerField(
        choices=JieCi.choices,
        default=JieCi.First_class
    )

    class Meta:
        db_table = "Time_Information"
        unique_together = (("Week", "weekday", "jie_ci"),)
        verbose_name = "上课时间信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "第%s周的%s,具体时间%s" % (self.Week, self.weekday, self.jie_ci)


class Building(models.Model):
    name = models.TextField(max_length=20, default='公共教学一楼', verbose_name="教学楼名称")

    class Meta:
        db_table = "Buildings"
        verbose_name = "教学楼信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Classroom(models.Model):
    # id = models.AutoField(primary_key=True,verbose_name="教室id")
    classroom_id = models.CharField(max_length=30, verbose_name="教室编号", primary_key=True)
    place = models.ForeignKey(Building, null=True, blank=True, on_delete=models.CASCADE, related_name="location",
                              verbose_name="教室所在教学楼")
    is_engine_room = models.BooleanField(verbose_name="是否机房", default=False, blank=False)
    Capacity = models.IntegerField(verbose_name="教室容量", default=0)

    class Meta:
        db_table = "Classroom"
        verbose_name = "教室信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "教室编号:%s" % (self.classroom_id)


# class teaching_class_classroom_time_assignment(TC):
class Scheduling(TC):
    s_id = models.AutoField(primary_key=True, verbose_name="排课编号")
    teaching_class_id = models.ForeignKey(TeachingClass, on_delete=models.CASCADE, related_name="s_teaching_class_id",
                                          verbose_name="教学班编号", blank=False)
    # time = models.ForeignKey(TC,blank=False,on_delete=models.CASCADE,related_name="relation_time",verbose_name="教学班上课时间")
    classroom_id = models.ForeignKey(Classroom, on_delete=models.CASCADE, blank=True,
                                     related_name="s_classroom_id", verbose_name="教室")

    class Meta:
        db_table = "Scheduling"
        # verbose_name = "教学班-使用教室-时间关系"
        verbose_name = "排课信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        # return "教学班%s,时间:%s,教室:" % (self.teaching_id, self.time, self.classroom_id)
        return "教学班{}-教室{}-时间-{}".format(self.teaching_class_id, self.classroom_id, self.jie_ci)


# class teaching_class_teacher_time_assignment(TC):
class TeacherScheduling(TC):
    ts_id = models.AutoField(primary_key=True, verbose_name="编号")
    teaching_class_id = models.ForeignKey(TeachingClass, on_delete=models.CASCADE, related_name="ts_teaching_class_id",
                                          verbose_name="教学班编号", blank=False)
    # time1 = models.ForeignKey(TC,blank=True,on_delete=models.CASCADE,related_name="relation_time2",verbose_name="教学班上课时间")
    teacher = models.ForeignKey(Teacher, blank=False, on_delete=models.CASCADE,
                                related_name="ts_teacher", verbose_name="授课老师")

    class Meta:
        db_table = "TeacherScheduling"
        verbose_name = "教师排课信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        # return "教学班%s,时间:%s,教师:" % (self.teaching_class_id, self.time1, self.teacher)
        return "教学班{}-教师{}-时间-{}".format(self.teaching_class_id, self.teacher, self.jie_ci)


# -----------------------TeacherMessage------------------
class TeacherMessage(models.Model):
    teacher_id = models.ForeignKey(Teacher, blank=False, on_delete=models.CASCADE,
                                   related_name="teacher_message_connect", verbose_name="反馈信息的教师")
    feedback_message = models.TextField(verbose_name="反馈的信息", blank=False, max_length=300)
    feedback_time = models.TimeField(auto_now_add=True, verbose_name="反馈时间")
    status = models.BooleanField(verbose_name="已处理", default=False)

    class Meta:
        verbose_name = "教师信息反馈表"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "编号为%s的教师提交了信息:%s" % (self.teacher_id, self.feedback_message)
