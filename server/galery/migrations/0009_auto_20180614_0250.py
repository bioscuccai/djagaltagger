# Generated by Django 2.0.5 on 2018-06-14 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galery', '0008_imagerange'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagerange',
            name='color',
            field=models.CharField(default='#000000', max_length=255),
        ),
        migrations.AddField(
            model_name='imagerange',
            name='mixed',
            field=models.BooleanField(default=False),
        ),
    ]
