from abc import ABC

from django.contrib.auth.models import User
from rest_framework import serializers
from character_manager.models import *


class UserSerializer(serializers.ModelSerializer):
    is_superuser = serializers.BooleanField(read_only=True, required=False)
    class Meta:
        model = User
        fields = ("id", "email", "username", "characters", "is_superuser")


class AbilitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abilita
        fields = "__all__"


class ClasseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classe
        fields = "__all__"


class IncantesimoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incantesimo
        fields = "__all__"


class OggettoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oggetto
        fields = "__all__"


class SpecieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specie
        fields = "__all__"


class PossiedeSerializer(serializers.ModelSerializer):
    oggetto = OggettoSerializer(many=False, read_only=True)

    class Meta:
        model = Possiede
        fields = "__all__"


class SaFareSerializer(serializers.ModelSerializer):
    abilita = AbilitaSerializer(many=False, read_only=True)

    class Meta:
        model = SaFare
        fields = "__all__"


class IstruitoASerializer(serializers.ModelSerializer):
    classe = ClasseSerializer(many=False, read_only=True)

    class Meta:
        model = IstruitoA
        fields = "__all__"


class LanciaSerializer(serializers.ModelSerializer):
    incantesimo = IncantesimoSerializer(many=False, read_only=True)

    class Meta:
        model = Lancia
        fields = "__all__"


class PossiedeSerializerId(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Possiede
        fields = ("id", "quantita", "oggetto")


class SaFareSerializerId(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = SaFare
        fields = ("id", "grado", "abilita")


class IstruitoASerializerId(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = IstruitoA
        fields = ("id", "livello", "classe")


class LanciaSerializerId(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Lancia
        fields = ("id", "preparato", "incantesimo")


class PersonaggioSerializerReadOnly(serializers.ModelSerializer):
    specie = SpecieSerializer(many=False, read_only=True)
    oggetti = PossiedeSerializer(many=True, source="possiede_set")
    abilita = SaFareSerializer(many=True, source="safare_set")
    classi = IstruitoASerializer(many=True, source="istruitoa_set")
    incantesimi = LanciaSerializer(many=True, source="lancia_set")

    class Meta:
        model = Personaggio
        fields = "__all__"


class PersonaggioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personaggio
        fields = "__all__"


class PersonaggioSerializerId(serializers.ModelSerializer):
    oggetti = PossiedeSerializerId(many=True, source="possiede_set")
    abilita = SaFareSerializerId(many=True, source="safare_set")
    classi = IstruitoASerializerId(many=True, source="istruitoa_set")
    incantesimi = LanciaSerializerId(many=True, source="lancia_set")

    class Meta:
        model = Personaggio
        fields = "__all__"

    def update(self, instance, validated_data):
        instance: Personaggio
        instance.nome = validated_data.get('nome', instance.nome)
        instance.pv_max = validated_data.get('pv_max', instance.pv_max)
        instance.pv_attuali = validated_data.get("pv_attuali", instance.pv_attuali)
        instance.classe_armatura = validated_data.get("classe_armatura", instance.classe_armatura)
        instance.capacita = validated_data.get("capacita", instance.capacita)
        instance.livello = validated_data.get("livello", instance.livello)
        instance.forza = validated_data.get("forza", instance.forza)
        instance.destrezza = validated_data.get("destrezza", instance.destrezza)
        instance.intelligenza = validated_data.get("intelligenza", instance.intelligenza)
        instance.saggezza = validated_data.get("saggezza", instance.saggezza)
        instance.carisma = validated_data.get("carisma", instance.carisma)
        instance.costituzione = validated_data.get("costituzione", instance.costituzione)
        instance.note = validated_data.get("note", instance.note)
        instance.specie = validated_data.get("specie", instance.specie)
        for elem in list(set([e['id'] for e in instance.oggetti.values()]) - set(
                [oggetto.get('oggetto').id for oggetto in validated_data.get('possiede_set')])):
            possiede = Possiede.objects.get(oggetto_id=elem, personaggio_id=instance.id)
            possiede.delete()
        for oggetto in validated_data.get('possiede_set'):
            possiede_id = oggetto.get('id')
            if possiede_id:
                possiede = Possiede.objects.get(id=possiede_id)
                possiede.quantita = oggetto.get("quantita", possiede.quantita)
                possiede.save()
            else:
                elem = oggetto.get('oggetto')
                if not elem:
                    pass
                else:
                    if elem.id not in [e['id'] for e in instance.oggetti.values()]:
                        Possiede.objects.create(quantita=oggetto.get("quantita"), oggetto_id=elem.id,
                                                personaggio_id=instance.id)
        for elem in list(set([e['id'] for e in instance.classi.values()]) - set(
                    [classe.get('classe').id for classe in validated_data.get('istruitoa_set')])):
            istruito = IstruitoA.objects.get(oggetto_id=elem, personaggio_id=instance.id)
            istruito.delete()
        for classe in validated_data.get('istruitoa_set'):
            istruito_id = classe.get("id")
            if istruito_id:
                istruito = IstruitoA.objects.get(id=istruito_id)
                istruito.livello = classe.get("livello", istruito.livello)
                istruito.save()
            else:
                elem = classe.get("classe")
                if not elem:
                    pass
                else:
                    if elem.id not in [e['id'] for e in instance.classi.values()]:
                        IstruitoA.objects.create(livello=classe.get("livello"), classe_id=elem.id,
                                                 personaggio_id=instance.id)
        for elem in list(set([e['id'] for e in instance.abilita.values()]) - set(
                [abilita.get('abilita').id for abilita in validated_data.get('safare_set')])):
            abilita = SaFare.objects.get(oggetto_id=elem, personaggio_id=instance.id)
            abilita.delete()
        for abilita in validated_data.get('safare_set'):
            safare_id = abilita.get("id")
            if safare_id:
                safare = SaFare.objects.get(id=safare_id)
                safare.grado = abilita.get("grado", safare.grado)
                safare.save()
            else:
                elem = abilita.get("abilita")
                if not elem:
                    pass
                else:
                    if elem.id not in [e['id'] for e in instance.abilita.values()]:
                        SaFare.objects.create(grado=abilita.get("grado"), abilita_id=elem.id,
                                              personaggio_id=instance.id)
        for elem in list(set([e['id'] for e in instance.incantesimi.values()]) - set(
                [incantesimo.get('incantesimo').id for incantesimo in validated_data.get('lancia_set')])):
            incantesimo = Lancia.objects.get(incantesimo_id=elem, personaggio_id=instance.id)
            incantesimo.delete()
        for incantesimo in validated_data.get('lancia_set'):
            lancia_id = incantesimo.get("id")
            if lancia_id:
                lancia = Lancia.objects.get(id=lancia_id)
                lancia.preparato = incantesimo.get("preparato", lancia.preparato)
                lancia.save()
            else:
                elem = incantesimo.get("incantesimo")
                if not elem:
                    pass
                else:
                    if elem.id not in [e['id'] for e in instance.incantesimi.values()]:
                        Lancia.objects.create(preparato=incantesimo.get("preparato"), incantesimo_id=elem.id,
                                              personaggio_id=instance.id)
        instance.save()
        return instance
