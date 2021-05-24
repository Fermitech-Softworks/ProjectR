from django.contrib.auth.models import User
from .models import *
from rest_framework import viewsets
from rest_framework import permissions
from character_manager.serializers import UserSerializer, PersonaggioSerializer
from .permissions import AdminOrSelf


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AdminOrSelf]


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
    permission_classes = [AdminOrSelf]

    def get_queryset(self):
        characters = Personaggio.objects.filter(user_id=self.request.user.id).all()
        return characters

class CampaignViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows campaigns to be listed
    """
    pass