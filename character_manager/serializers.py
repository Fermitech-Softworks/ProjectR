from abc import ABC

from django.contrib.auth.models import User
from rest_framework import serializers
from character_manager.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "username", "characters", "is_superuser")


class AbilitaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Abilita
        depth = 0


class ClasseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Classe
        depth = 0


class IncantesimoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Incantesimo
        depth = 0


class SpecieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Specie
        fields = "__all__"


class PersonaggioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personaggio
        fields = "__all__"
