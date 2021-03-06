# Generated by Django 3.2 on 2021-05-03 22:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Abilita',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=64)),
                ('descrizione', models.TextField()),
                ('attributo', models.CharField(choices=[('STR', 'Forza'), ('DEX', 'Destrezza'), ('INT', 'Intelligenza'), ('WIS', 'Saggezza'), ('CHA', 'Carisma'), ('COS', 'Costituzione')], default='STR', max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Classe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=64)),
                ('dettagli', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Incantesimo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=64)),
                ('scuola', models.CharField(max_length=64)),
                ('componenti', models.TextField()),
                ('dadi', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='IstruitoA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('livello', models.IntegerField(default=1)),
                ('classe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.classe')),
            ],
        ),
        migrations.CreateModel(
            name='Lancia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preparato', models.BooleanField(default=False)),
                ('incantesimo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.incantesimo')),
            ],
        ),
        migrations.CreateModel(
            name='Oggetto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=64)),
                ('costo', models.CharField(max_length=32)),
                ('dettagli', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Personaggio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=64)),
                ('pv_max', models.IntegerField()),
                ('pv_attuali', models.IntegerField()),
                ('classe_armatura', models.IntegerField()),
                ('capacita', models.IntegerField()),
                ('livello', models.IntegerField()),
                ('forza', models.IntegerField()),
                ('destrezza', models.IntegerField()),
                ('intelligenza', models.IntegerField()),
                ('saggezza', models.IntegerField()),
                ('carisma', models.IntegerField()),
                ('costituzione', models.IntegerField()),
                ('note', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Specie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=64)),
                ('dettagli', models.TextField()),
                ('characters', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='character_manager.personaggio')),
            ],
        ),
        migrations.CreateModel(
            name='SaFare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grado', models.IntegerField(choices=[(0, 'No'), (1, 'Mezza proficiency'), (2, 'Proficiency'), (3, 'Expertise')], default=0)),
                ('abilita', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.abilita')),
                ('personaggio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.personaggio')),
            ],
        ),
        migrations.CreateModel(
            name='Possiede',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantita', models.IntegerField()),
                ('oggetto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.oggetto')),
                ('personaggio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.personaggio')),
            ],
        ),
        migrations.AddField(
            model_name='personaggio',
            name='abilita',
            field=models.ManyToManyField(through='character_manager.SaFare', to='character_manager.Abilita'),
        ),
        migrations.AddField(
            model_name='personaggio',
            name='classi',
            field=models.ManyToManyField(through='character_manager.IstruitoA', to='character_manager.Classe'),
        ),
        migrations.AddField(
            model_name='personaggio',
            name='incantesimi',
            field=models.ManyToManyField(through='character_manager.Lancia', to='character_manager.Incantesimo'),
        ),
        migrations.AddField(
            model_name='personaggio',
            name='oggetti',
            field=models.ManyToManyField(through='character_manager.Possiede', to='character_manager.Oggetto'),
        ),
        migrations.AddField(
            model_name='personaggio',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='lancia',
            name='personaggio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.personaggio'),
        ),
        migrations.AddField(
            model_name='istruitoa',
            name='personaggio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='character_manager.personaggio'),
        ),
    ]
