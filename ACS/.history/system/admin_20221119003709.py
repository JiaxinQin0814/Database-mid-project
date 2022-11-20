from django.contrib import admin
from .models import Teacher_Info,Admin_Info
from django.contrib.auth.models import User
# Register your models here.
class TeacherInfoAdmin(admin.ModelAdmin):
    list_display=['Teacher_Id','Teacher_name','password','school']
    
class AdminInfoAdmin(admin.ModelAdmin):
    list_display=["Admin_Id","Admin_name","password","school"]

class SchoolInfoAdmin(admin.ModelAdmin):
    list_display=["school_name"]
    
class Source_class_InfoAdmin(admin.ModelAdmin):
    list_display=["class_Id","class_name","credit","using","character1","character2","school"]
    
admin.site.register(Teacher_Info,TeacherInfoAdmin)
admin.site.register()
