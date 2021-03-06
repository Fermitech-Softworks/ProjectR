# Generated by Django 3.2 on 2021-05-29 14:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('character_manager', '0003_alter_personaggio_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abilita',
            name='attributo',
            field=models.CharField(choices=[('STR', 'forza'), ('DEX', 'destrezza'), ('INT', 'intelligenza'), ('WIS', 'saggezza'), ('CHA', 'carisma'), ('COS', 'costituzione')], default='STR', max_length=3),
        ),
        migrations.AlterField(
            model_name='personaggio',
            name='abilita',
            field=models.ManyToManyField(related_name='abilita', through='character_manager.SaFare', to='character_manager.Abilita'),
        ),
        migrations.AlterField(
            model_name='personaggio',
            name='classi',
            field=models.ManyToManyField(related_name='classi', through='character_manager.IstruitoA', to='character_manager.Classe'),
        ),
        migrations.AlterField(
            model_name='personaggio',
            name='incantesimi',
            field=models.ManyToManyField(related_name='incantesimi', through='character_manager.Lancia', to='character_manager.Incantesimo'),
        ),
        migrations.AlterField(
            model_name='personaggio',
            name='oggetti',
            field=models.ManyToManyField(related_name='zaino', through='character_manager.Possiede', to='character_manager.Oggetto'),
        ),
        migrations.AlterField(
            model_name='personaggio',
            name='specie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='specie', to='character_manager.specie'),
        ),
        migrations.AlterField(
            model_name='personaggio',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='characters', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='safare',
            name='grado',
            field=models.IntegerField(choices=[(1, 'Mezza proficiency'), (2, 'Proficiency'), (3, 'Expertise')], default=0),
        ),
    ]
