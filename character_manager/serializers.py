from abc import ABC

from django.contrib.auth.models import User
from rest_framework import serializers
from character_manager.models import *


class UserSerializer(serializers.ModelSerializer):
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


class SpecieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specie
        fields = "__all__"


class PersonaggioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personaggio
        fields = "__all__"
