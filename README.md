# Database-mid-project
This is a repo for our mid term big project  
We will create a system for managing the class in RUC

# 11_2
create database

the tables:

* 课程表【课程编号，课程中英文名称、学分、课程性质、开课学期、任课教师、建课时间、授课对象、计划修读人数，所属培养方案，选课人数（none），】
* 培养方案表  【培养方案编号，课程编号，培养方案名称，课程性质，所属学院】
* SC表  触发器 自动更新课程表
* 教室课程表【教师编号，课程时间，容量】


学习资源  
【【代码过程】Python Django 实现简易学生选课管理系统代码编写过程展示】 https://www.bilibili.com/video/BV1mU4y1a7zk/?p=5&share_source=copy_web&vd_source=50ffbf94a9b64ea6240227792894623e


【Django实现学生选课管理系统】 https://www.bilibili.com/video/BV16d4y1N7uV/?share_source=copy_web&vd_source=50ffbf94a9b64ea6240227792894623e

# 11_19

接口文档链接 http://xiaoyaoji.cn/

如果有跑不通的情况随时dd我

## 食用指南
关于环境配置，尝试
```
pip install requirements.txt
```

运行
```
# 首先需要在setting中修改这里为你自己的mysql配置
DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.mysql',
       'NAME':'asc_data',
       'USER': 'root',
       'PASSWORD': '22450438',
       'HOST': '127.0.0.1',
       'POST': '3306'
  }
}

cd ./ACS
python manage,py createsuperuser #然后需要先创建一个超级用户 在终端会有提示 ，根据提示输入即可  
python manage.py runserver
在浏览器中进入 127.0.0.1/admin 就可以登录上面注册的超级用户
然后127.0.0.1/register 现在可以注册用户
然后127.0.0.1/login 可以登录刚才注册的用户
```
