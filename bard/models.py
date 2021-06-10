from django.db import models
from django.contrib.auth.models import User
from character_manager.models import Personaggio


# Create your models here.


class Campagna(models.Model):
    titolo = models.CharField(max_length=64)
    descrizione = models.TextField()
    utenti = models.ManyToManyField(User, through="Partecipa", related_name="partecipanti_campagna")
    personaggi = models.ManyToManyField(Personaggio, related_name="personaggi_campagna")


class Partecipa(models.Model):
    comeDm = models.BooleanField(default=False)
    campagna = models.ForeignKey(Campagna, on_delete=models.CASCADE, related_name="campagna_partecipa")
    utente = models.ForeignKey(User, on_delete=models.CASCADE, related_name="utente_partecipa")


class Gruppo(models.Model):
    nome = models.CharField(max_length=64)
    attivo = models.BooleanField(default=False)
    campagna = models.ForeignKey(Campagna, on_delete=models.CASCADE, related_name="campagna_gruppo")
    users = models.ManyToManyField(User, related_name="utenti_gruppo")


class Messaggio(models.Model):
    messaggi_tipo = [(1, "Testo"), (2, "Messaggi")]
    tipo = models.PositiveSmallIntegerField(choices=messaggi_tipo, default=1)
    contenuto = models.TextField()
    immagine = models.ImageField(upload_to='messages', null=True)
    ora = models.DateTimeField()
    in_risposta = models.ForeignKey('self', null=True, on_delete=models.CASCADE, related_name="risposta")
    gruppo = models.ForeignKey(Gruppo, on_delete=models.CASCADE, related_name="gruppo_messaggio")
    utente = models.ForeignKey(User, on_delete=models.CASCADE, related_name="utente_messaggio")
