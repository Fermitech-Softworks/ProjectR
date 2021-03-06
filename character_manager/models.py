from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Oggetto(models.Model):
    nome = models.CharField(max_length=64)
    costo = models.CharField(max_length=32)
    dettagli = models.TextField()

    def __str__(self):
        return f"[Oggetto] {self.nome}"


class Abilita(models.Model):
    nome = models.CharField(max_length=64)
    descrizione = models.TextField()
    attributo_choices = [('STR', 'forza'), ('DEX', 'destrezza'), ('INT', 'intelligenza'), ('WIS', 'saggezza'),
                         ('CHA', 'carisma'), ('COS', 'costituzione')]
    attributo = models.CharField(max_length=3, choices=attributo_choices, default="STR")

    def __str__(self):
        return f"[Abilita] {self.nome}"


class Classe(models.Model):
    nome = models.CharField(max_length=64)
    dettagli = models.TextField()

    def __str__(self):
        return f"[Classe] {self.nome}"


class Incantesimo(models.Model):
    nome = models.CharField(max_length=64)
    scuola = models.CharField(max_length=64)
    componenti = models.TextField()
    dadi = models.TextField()
    descrizione = models.TextField()

    def __str__(self):
        return f"[Incantesimo] {self.nome}"


class Specie(models.Model):
    nome = models.CharField(max_length=64)
    dettagli = models.TextField()

    def __str__(self):
        return f"[Specie] {self.nome}"


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
    note = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="characters")
    oggetti = models.ManyToManyField(Oggetto, through="Possiede", related_name="zaino")
    abilita = models.ManyToManyField(Abilita, through="SaFare", related_name="abilita")
    classi = models.ManyToManyField(Classe, through="IstruitoA", related_name="classi")
    incantesimi = models.ManyToManyField(Incantesimo, through="Lancia", related_name="incantesimi")
    specie = models.ForeignKey(Specie, on_delete=models.PROTECT, null=False, related_name="specie")

    def __str__(self):
        return f"[Personaggio] {self.nome}, di {self.user.username}"

    def is_sheet_valid(self):
        if self.livello > 20:
            return False
        if self.forza > 30:
            return False
        if self.destrezza > 30:
            return False
        if self.carisma > 30:
            return False
        if self.costituzione > 30:
            return False
        if self.intelligenza > 30:
            return False
        if self.saggezza > 30:
            return False
        return True


class Possiede(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    oggetto = models.ForeignKey(Oggetto, on_delete=models.CASCADE)
    quantita = models.IntegerField()

    def __str__(self):
        return f"[Possiede] {self.personaggio_id} - {self.oggetto_id}"


class SaFare(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    abilita = models.ForeignKey(Abilita, on_delete=models.CASCADE)
    proficiencies_choices = [(1, "Mezza proficiency"), (2, "Proficiency"), (3, "Expertise")]
    grado = models.IntegerField(choices=proficiencies_choices, default=2)

    def __str__(self):
        return f"[SaFare] {self.personaggio_id} - {self.abilita_id}"


class IstruitoA(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    classe = models.ForeignKey(Classe, on_delete=models.CASCADE)
    livello = models.IntegerField(default=1)

    def __str__(self):
        return f"[IstruitoA] {self.personaggio_id} - {self.classe_id}"


class Lancia(models.Model):
    personaggio = models.ForeignKey(Personaggio, on_delete=models.CASCADE)
    incantesimo = models.ForeignKey(Incantesimo, on_delete=models.CASCADE)
    preparato = models.BooleanField(default=False)

    def __str__(self):
        return f"[Lancia] {self.personaggio_id} - {self.incantesimo_id}"
