from rest_framework import serializers
from bard.models import *
from character_manager.serializers import PersonaggioSerializer, UserSerializer, PersonaggioSerializerReadOnly


class PartecipaSerializerUserDetails(serializers.ModelSerializer):
    utente = UserSerializer(many=False, read_only=True)


    class Meta:
        model = Partecipa
        fields = "__all__"


class GruppoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Gruppo
        fields = ("id", "nome", "attivo", "users")


class MessaggioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Messaggio
        fields = "__all__"


class MessaggioSerializerReplies(serializers.ModelSerializer):
    in_risposta = MessaggioSerializer(many=False, read_only=True)
    class Meta:
        model = Messaggio
        fields = ("id", "tipo", "contenuto", "ora", "gruppo", "utente", "immagine", "in_risposta")


class GruppoSerializerMessages(serializers.ModelSerializer):
    gruppo_messaggio = MessaggioSerializer(allow_null=False, read_only=True, many=True)

    class Meta:
        model = Gruppo
        fields = "__all__"


class PartecipaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    username = serializers.CharField(read_only=True, source="utente")

    class Meta:
        model = Partecipa
        fields = ("id", "comeDm", "utente", "username")


class CampagnaCharacterSerializer(serializers.ModelSerializer):
    personaggi = PersonaggioSerializerReadOnly(many=True, read_only=True)

    class Meta:
        model = Campagna
        fields = ("id", "personaggi")


class CampagnaCreateSerializer(serializers.ModelSerializer):
    utenti = PartecipaSerializer(many=True, read_only=False, source="campagna_partecipa")
    gruppi = GruppoSerializer(many=True, read_only=False, source="campagna_gruppo")

    class Meta:
        model = Campagna
        fields = ["id", "titolo", "descrizione", "utenti", "gruppi"]

    def update(self, instance, validated_data):
        instance: Campagna
        instance.titolo = validated_data.get('titolo', instance.titolo)
        instance.descrizione = validated_data.get('descrizione', instance.descrizione)

        for elem in list(set([e['id'] for e in instance.campagna_partecipa.values()]) -
                         set([partecipa.get('id') for partecipa in validated_data.get('campagna_partecipa') if
                              partecipa.get('id')])):
            partecipa = Partecipa.objects.get(id=elem)
            if not partecipa.comeDm:
                partecipa.delete()
        for partecipazione in validated_data.get('campagna_partecipa'):
            partecipa_id = partecipazione.get("id")
            if partecipa_id:
                partecipa = Partecipa.objects.get(id=partecipa_id)
                partecipa.comeDm = partecipazione.get('comeDm')

            else:
                utente = User.objects.get(id=partecipazione.get('utente').id)
                if utente:
                    if utente.id not in [e['id'] for e in instance.utenti.values()]:
                        Partecipa.objects.create(utente=utente, campagna=instance, comeDm=partecipazione.get('comeDm'))
            partecipa.save()

        for elem in list(set([e['id'] for e in instance.campagna_gruppo.values()]) -
                         set([gruppo.get('id') for gruppo in validated_data.get('campagna_gruppo') if
                              gruppo.get('id')])):
            gruppo = Gruppo.objects.get(id=elem)
            gruppo.delete()
        for gruppo in validated_data.get('campagna_gruppo'):
            gruppo_id = gruppo.get('id')
            if gruppo_id:
                g = Gruppo.objects.get(id=gruppo_id)
                g.nome = gruppo.get('nome')
                g.attivo = gruppo.get('attivo')
                for elem in list(set([e['id'] for e in g.users.values()]) - set([e.id for e in gruppo.get('users')])):
                    if not Partecipa.objects.filter(campagna=instance, utente_id=elem, comeDm=True):
                        g.users.remove(elem)
                for elem in gruppo.get('users'):
                    if not g.users.filter(id=elem.id):
                        g.users.add(elem)

            else:
                g = Gruppo.objects.create(nome=gruppo.get('nome'), attivo=False, campagna=instance)
                for elem in gruppo.get('users'):
                    user = User.objects.get(id=elem.id)
                    g.users.add(elem)
            g.save()
        instance.save()
        return instance


class CampagnaSerializer(serializers.ModelSerializer):
    admin_id = serializers.IntegerField(allow_null=False, required=True, write_only=True)

    class Meta:
        model = Campagna
        fields = ["id", "titolo", "descrizione", "admin_id"]

    def create(self, validated_data):
        campagna = Campagna.objects.create(titolo=validated_data.get('titolo'),
                                           descrizione=validated_data.get('descrizione'))
        user = User.objects.get(id=validated_data.get("admin_id"))
        Partecipa.objects.create(utente_id=user.id, campagna_id=campagna.id, comeDm=True)
        return campagna


class PartecipaSerializerDetails(serializers.ModelSerializer):
    utente = UserSerializer(many=False, read_only=True)
    campagna = CampagnaSerializer(many=False, read_only=True)

    class Meta:
        model = Partecipa
        fields = "__all__"


class CampagnaSerializerDetails(serializers.ModelSerializer):
    personaggi = PersonaggioSerializer(many=True, read_only=True)
    utenti = PartecipaSerializerUserDetails(many=True, read_only=True, source="campagna_partecipa")
    gruppi = GruppoSerializer(many=True, read_only=False, source="campagna_gruppo")

    class Meta:
        model = Campagna
        fields = ("id", "titolo", "descrizione", "utenti", "personaggi", "gruppi")


class GruppoSerializerDetails(serializers.ModelSerializer):
    utente = UserSerializer(many=True, read_only=True)
    campagna = CampagnaSerializer(many=False, read_only=True)

    class Meta:
        model = Gruppo
        fields = "__all__"





class MessaggioSerializerDetails(serializers.ModelSerializer):
    gruppo = GruppoSerializer(many=False, read_only=True)
    utente = UserSerializer(many=False, read_only=True)
    in_risposta = MessaggioSerializer(many=False, read_only=False)

    class Meta:
        model = Messaggio
        fields = "__all__"
