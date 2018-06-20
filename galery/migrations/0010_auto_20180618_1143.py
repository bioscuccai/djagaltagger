# Generated by Django 2.0.5 on 2018-06-18 11:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('galery', '0009_auto_20180614_0250'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='image',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
