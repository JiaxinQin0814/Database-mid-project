# Generated by Django 3.2.16 on 2022-11-20 17:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0002_rename_name_myuser_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='myuser',
            old_name='Id',
            new_name='identifier',
        ),
    ]