from django.db import models
from django.contrib.auth.models import User
from character_manager.models import Personaggio


# Create your models here.


class Campagna(models.Model):
    titolo = models.CharField(max_length=64)
    descrizione = models.TextField()
    utenti = models.ManyToManyField(User, through="Partecipa")
    personaggi = models.ManyToManyField(Personaggio)


class Partecipa(models.Model):
    comeDm = models.BooleanField(default=False)
    campagna = models.ForeignKey(Campagna, on_delete=models.CASCADE)
    utente = models.ForeignKey(User, on_delete=models.CASCADE)


class Gruppo(models.Model):
    nome = models.CharField(max_length=64)
    attivo = models.BooleanField(default=False)
    campagna = models.ForeignKey(Campagna, on_delete=models.CASCADE)
    users = models.ManyToManyField(User)


class Messaggio(models.Model):
    messaggi_tipo = [(1, "Testo"), (2, "Messaggi")]
    tipo = models.PositiveSmallIntegerField(choices=messaggi_tipo, default=1)
    contenuto = models.TextField()
    ora = models.DateTimeField()
    in_risposta = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    gruppo = models.ForeignKey(Gruppo, on_delete=models.CASCADE)