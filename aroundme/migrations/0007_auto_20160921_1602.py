# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-09-21 16:02
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aroundme', '0006_auto_20160918_1631'),
    ]

    operations = [
        migrations.RenameField(
            model_name='anniversary',
            old_name='member_main',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='personalevent',
            old_name='member_main',
            new_name='user',
        ),
    ]