from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Oggetto(models.Model):
    nome = models.CharField(max_length=64)
    costo = models.CharField(max_length=32)
    dettagli = models.TextField()


class Abilita(models.Model):
    nome = models.CharField(max_length=64)
    descrizione = models.TextField()
    attributo_choices = [('STR', 'Forza'), ('DEX', 'Destrezza'), ('INT', 'Intelligenza'), ('WIS', 'Saggezza'),
                         ('CHA', 'Carisma'), ('COS', 'Costituzione')]
    attributo = models.CharField(max_length=3, choices=attributo_choices, default="STR")


class Classe(models.Model):
    nome = models.CharField(max_length=64)
    dettagli = models.TextField()


class Incantesimo(models.Model):
    nome = models.CharField(max_length=64)
    scuola = models.CharField(max_length=64)
    componenti = models.TextField()
    dadi = models.TextField()


class Personaggio(models.Model):
    nome = models.CharField(max_length=64)
    pv_max = models.IntegerField()
    pv_attuali = models.IntegerField()
    classe_armatura = models.IntegerField()
    capacita = models.IntegerField()
    livello = models.IntegerField()
    # Attributi
    forza = models.IntegerField()
    destrezza = models.IntegerField()
    intelligenza = models.IntegerField()
    saggezza = models.IntegerField()
    carisma = models.IntegerField()
    costituzione = models.IntegerField()
    note = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    oggetti = models.ManyToManyField(Oggetto, through="Possiede")
    abilita = models.ManyToManyField(Abilita, through="SaFare")
    classi = models.ManyToManyField(Classe, through="IstruitoA")
    incantesimi = models.ManyToManyField(Incantesimo, through="Lancia")


class Possiede(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    oggetto = models.ForeignKey(Oggetto, on_delete=models.CASCADE)
    quantita = models.IntegerField()


class SaFare(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    abilita = models.ForeignKey(Abilita, on_delete=models.CASCADE)
    proficiencies_choices = [(0, "No"), (1, "Mezza proficiency"), (2, "Proficiency"), (3, "Expertise")]
    grado = models.IntegerField(choices=proficiencies_choices, default=0)


class IstruitoA(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    classe = models.ForeignKey(Classe, on_delete=models.CASCADE)
    livello = models.IntegerField(default=1)


class Lancia(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    incantesimo = models.ForeignKey(Incantesimo, on_delete=models.CASCADE)
    preparato = models.BooleanField(default=False)


class Specie(models.Model):
    nome = models.CharField(max_length=64)
    dettagli = models.TextField()
    characters = models.ForeignKey(Personaggio, on_delete=models.PROTECT)