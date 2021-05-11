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


class CharacterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows characters to be viewed or edited.
    """
    serializer_class = PersonaggioSerializer
    permission_classes = [AdminOrSelf]

    def get_queryset(self):
        characters = Personaggio.objects.filter(user_id=self.request.user.id).all()
        return characters
