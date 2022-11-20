from django.contrib import admin
from .models import Teacher_Info
from django.contrib.auth.models import User
# Register your models here.
class TeacherInfoAdmin(admin.ModelAdmin):
    list_display=['Teacher_Id','Teacher_name','password','school']
    
class AdminInfoAdmin(admin.ModelAdmin):
    list_display=["Admin_Id"]]

admin.site.register(Teacher_Info,TeacherInfoAdmin)
