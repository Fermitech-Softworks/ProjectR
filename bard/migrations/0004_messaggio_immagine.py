# Generated by Django 3.2 on 2021-06-10 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bard', '0003_auto_20210607_1639'),
    ]

    operations = [
        migrations.AddField(
            model_name='messaggio',
            name='immagine',
            field=models.ImageField(null=True, upload_to='messages'),
        ),
    ]
