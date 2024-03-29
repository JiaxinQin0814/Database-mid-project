from django.contrib import admin
# from .models import Teacher_Info,Admin_Info,Source_class,School
from django.contrib.auth.models import User
from django.apps import apps

# Register your models here.
models = apps.get_models()


for model in models:
    try :
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass

# class TeacherInfoAdmin(admin.ModelAdmin):
#     list_display=['Teacher_Id','Teacher_name','password','school']
    
# class AdminInfoAdmin(admin.ModelAdmin):
#     list_display=["Admin_Id","Admin_name","password","school"]

# class SchoolInfoAdmin(admin.ModelAdmin):
#     list_display=["school_name"]
    
# class Source_class_InfoAdmin(admin.ModelAdmin):
#     list_display=["class_Id","class_name","credit","using","character1","character2","school"]
    
# admin.site.register(Teacher_Info,TeacherInfoAdmin)
# admin.site.register(School,SchoolInfoAdmin)
# admin.site.register(Admin_Info,AdminInfoAdmin)
# admin.site.register(Source_class,Source_class_InfoAdmin)
