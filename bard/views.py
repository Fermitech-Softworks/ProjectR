from .models import *
from rest_framework import viewsets
from rest_framework import permissions
from bard.serializers import *

from .permissions import IsDM, IsMember


class GruppoDetailsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Gruppo.objects.all()
    serializer_class = GruppoSerializerDetails
    permission_classes = [IsDM]

    def get_queryset(self):
        gruppi = Gruppo.objects.filter(campagna__campagna_partecipa__utente=self.request.user).all()
        return gruppi


class GruppoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Gruppo.objects.all()
    serializer_class = GruppoSerializer
    permission_classes = [IsDM]

    def get_queryset(self):
        gruppi = Gruppo.objects.filter(campagna__campagna_partecipa__utente=self.request.user).all()
        return gruppi


class CampagnaDetailsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Campagna.objects.all()
    serializer_class = CampagnaSerializerDetails
    permission_classes = [IsDM]

    def get_queryset(self):
        campaigns = Campagna.objects.filter(campagna_partecipa__utente=self.request.user).all()
        return campaigns


class CampagnaViewSet(viewsets.ModelViewSet):
    serializer_class = CampagnaSerializer
    permission_classes = [IsDM]

    def get_queryset(self):
        campaigns = Campagna.objects.filter(campagna_partecipa__utente=self.request.user).all()
        return campaigns


class CampagnaCreateViewSet(viewsets.ModelViewSet):
    serializer_class = CampagnaCreateSerializer
    permission_classes = [IsDM]

    def get_queryset(self):
        campaigns = Campagna.objects.filter(campagna_partecipa__utente=self.request.user).all()
        return campaigns


class MessaggioViewSet(viewsets.ModelViewSet):
    serializer_class = MessaggioSerializer
    permission_classes = [IsMember]

    def get_queryset(self):
        messages = Messaggio.objects.filter(gruppo__users=self.request.user).all()
        return messages
