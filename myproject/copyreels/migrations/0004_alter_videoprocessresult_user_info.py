# Generated by Django 5.1.1 on 2024-09-19 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copyreels', '0003_videoprocessresult'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videoprocessresult',
            name='user_info',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]