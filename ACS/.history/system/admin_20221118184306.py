from django.contrib import admin
from .models import Teacher_Info
from django.contrib.auth.models import User
# Register your models here.
class TeacherInfoAdmin(admin.ModelAdmin):
    list_display=''