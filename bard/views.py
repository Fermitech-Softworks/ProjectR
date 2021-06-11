from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated
from rest_framework.viewsets import ViewSet

from .models import *
from character_manager.models import Personaggio
from character_manager.serializers import PersonaggioSerializerReadOnly
from rest_framework import viewsets
from rest_framework import permissions
from bard.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .permissions import IsDM, IsMember, IsDmCharacter


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class GruppoDetailsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Gruppo.objects.all()
    serializer_class = GruppoSerializerDetails
    permission_classes = [IsDM]
    http_method_names = ['get', 'put', 'head', 'options']

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
    http_method_names = ['get', 'put', 'head', 'options']

    def get_queryset(self):
        gruppi = Gruppo.objects.filter(campagna__campagna_partecipa__utente=self.request.user).all()
        return gruppi


class MessaggiGruppoViewSet(viewsets.ModelViewSet):
    serializer_class = MessaggioSerializer
    permission_classes = [IsMember | ReadOnly]
    http_method_names = ['get', 'options', 'head']

    def get_queryset(self):
        messaggi = Messaggio.objects.filter(gruppo_id=int(self.kwargs['pk'])).order_by("-id").all()
        return messaggi


class GetMessaggiView(ViewSet):

    def list(self, request):
        return Response("200 OK", status=status.HTTP_200_OK)

    def post(self, request):
        if not request.data.get('gid'):
            return Response("400", status=status.HTTP_400_BAD_REQUEST)
        messaggi = Messaggio.objects.filter(gruppo_id=int(request.data['gid'])).order_by("-id")[:100]
        serializer = MessaggioSerializerReplies(messaggi, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        permission_classes = [IsMember]
        return [permission() for permission in permission_classes]


class AppartenenzaView(ViewSet):
    """Sets a connection between characters and campaigns"""

    def list(self, request):
        return Response("200 OK", status=status.HTTP_200_OK)

    def post(self, request, format=None):
        if not request.data.get('character_id') or not request.data.get('campaign_id'):
            return Response("400", status=status.HTTP_400_BAD_REQUEST)
        character_id = request.data['character_id']
        campaign_id = request.data['campaign_id']
        character = Personaggio.objects.get(id=character_id)
        if request.user.id != character.user_id:
            return Response("403", status=status.HTTP_403_FORBIDDEN)
        campaign = Campagna.objects.get(id=campaign_id)
        if request.user.id not in [u['utente_id'] for u in campaign.campagna_partecipa.values()]:
            return Response("403", status=status.HTTP_403_FORBIDDEN)
        data = campaign.personaggi.all()
        for elem in data:
            if elem.user_id == request.user.id:
                campaign.personaggi.remove(elem)
        campaign.personaggi.add(character)
        return Response("OK", status.HTTP_201_CREATED)

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class CampagnaDetailsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows campaigns to be viewed or edited.
    """
    queryset = Campagna.objects.all()
    serializer_class = CampagnaSerializerDetails
    permission_classes = [IsDM]
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_queryset(self):
        campaigns = Campagna.objects.filter(campagna_partecipa__utente=self.request.user).all()
        return campaigns


class CampagnaGetInfoPersonaggio(viewsets.ModelViewSet):
    serializer_class = PersonaggioSerializerReadOnly
    permission_classes = [IsDmCharacter | ReadOnly]
    http_method_names = ['get']

    def get_queryset(self):
        personaggi = Personaggio.objects.all()
        return personaggi


class CampagnaViewSet(viewsets.ModelViewSet):
    serializer_class = CampagnaSerializer
    permission_classes = [IsDM]
    http_method_names = ['get', 'post', 'head', 'options']

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
