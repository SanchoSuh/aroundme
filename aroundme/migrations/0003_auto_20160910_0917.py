# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-09-10 09:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aroundme', '0002_auto_20160910_0909'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='event_id',
        ),
        migrations.RemoveField(
            model_name='member',
            name='member_id',
        ),
        migrations.AddField(
            model_name='event',
            name='id',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='member',
            name='id',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]
