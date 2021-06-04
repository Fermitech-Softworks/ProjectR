from rest_framework import serializers
from bard.models import *
from character_manager.serializers import PersonaggioSerializer, UserSerializer


class PartecipaSerializerUserDetails(serializers.ModelSerializer):
    utente = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Partecipa
        fields = "__all__"


class GruppoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gruppo
        fields = "__all__"


class PartecipaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partecipa
        fields = "__all__"


class CampagnaCreateSerializer(serializers.ModelSerializer):
    utenti = PartecipaSerializer(many=True, read_only=False, source="campagna_partecipa")
    gruppi = GruppoSerializer(many=True, read_only=False, source="campagna_gruppo")
    class Meta:
        model = Campagna
        fields = ["id", "titolo", "descrizione", "utenti", "gruppi"]


class CampagnaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campagna
        fields = ["id", "titolo", "descrizione"]


class PartecipaSerializerDetails(serializers.ModelSerializer):
    utente = UserSerializer(many=False, read_only=True)
    campagna = CampagnaSerializer(many=False, read_only=True)

    class Meta:
        model = Partecipa
        fields = "__all__"


class CampagnaSerializerDetails(serializers.ModelSerializer):
    personaggi = PersonaggioSerializer(many=True, read_only=True)
    utenti = PartecipaSerializerUserDetails(many=True, read_only=True, source="campagna_partecipa")

    class Meta:
        model = Campagna
        fields = ("id", "titolo", "descrizione", "utenti", "personaggi")





class GruppoSerializerDetails(serializers.ModelSerializer):
    utente = UserSerializer(many=True, read_only=True)
    campagna = CampagnaSerializer(many=False, read_only=True)

    class Meta:
        model = Gruppo
        fields = "__all__"


class MessaggioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messaggio
        fields = "__all__"


class MessaggioSerializerDetails(serializers.ModelSerializer):
    gruppo = GruppoSerializer(many=False, read_only=True)
    utente = UserSerializer(many=False, read_only=True)
    in_risposta = MessaggioSerializer(many=False, read_only=False)

    class Meta:
        model = Messaggio
        fields = "__all__"
