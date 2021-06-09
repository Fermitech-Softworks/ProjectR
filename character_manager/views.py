from django.contrib.auth.models import User
from .models import *
from rest_framework import viewsets
from rest_framework import permissions
from character_manager.serializers import UserSerializer, PersonaggioSerializer, SpecieSerializer, ClasseSerializer, \
    AbilitaSerializer, IncantesimoSerializer, OggettoSerializer, PersonaggioSerializerId, PersonaggioSerializerReadOnly
from .permissions import AdminOrSelf, AdminOrOwner
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ReadOnly]


class UserDetailViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows to get details about users
    """
    serializer_class = UserSerializer
    permission_classes = [AdminOrSelf]

    def get_queryset(self):
        user = User.objects.filter(id=self.request.user.id).all()
        return user


class CharacterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows characters to be viewed or edited.
    """
    serializer_class = PersonaggioSerializer
    permission_classes = [AdminOrOwner]

    def get_queryset(self):
        characters = Personaggio.objects.filter(user_id=self.request.user.id).all()
        return characters


class CharacterFullViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaggioSerializerReadOnly
    permission_classes = [AdminOrOwner]

    def get_queryset(self):
        characters = Personaggio.objects.filter(user_id=self.request.user.id).all()
        return characters


class CharacterCreationViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaggioSerializerId
    permission_classes = [AdminOrOwner]

    def get_queryset(self):
        characters = Personaggio.objects.filter(user_id=self.request.user.id).all()
        return characters


class SpecieViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that allows the retrival of specie data
    """
    queryset = Specie.objects.all()
    serializer_class = SpecieSerializer
    permission_classes = [IsAuthenticated | ReadOnly]


class ClassViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that allows the retrival of specie data
    """
    queryset = Classe.objects.all()
    serializer_class = ClasseSerializer
    permission_classes = [IsAuthenticated | ReadOnly]


class CampaignViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows campaigns to be listed
    """
    pass


class AbilitaViewSet(viewsets.ModelViewSet):
    queryset = Abilita.objects.all()
    serializer_class = AbilitaSerializer
    permission_classes = [IsAuthenticated | ReadOnly]


class IncantesimoViewSet(viewsets.ModelViewSet):
    queryset = Incantesimo.objects.all()
    serializer_class = IncantesimoSerializer
    permission_classes = [IsAuthenticated | ReadOnly]


class OggettiViewSet(viewsets.ModelViewSet):
    queryset = Oggetto.objects.all()
    serializer_class = OggettoSerializer
    permission_classes = [IsAuthenticated | ReadOnly]