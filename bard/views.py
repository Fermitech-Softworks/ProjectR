from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.viewsets import ViewSet

from .models import *
from rest_framework import viewsets
from rest_framework import permissions
from bard.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .permissions import IsDM, IsMember


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


class MessaggiGruppoViewSet(viewsets.ModelViewSet):
    serializer_class = MessaggioSerializer
    permission_classes = [IsMember | ReadOnly]

    def get_queryset(self):
        messaggi = Messaggio.objects.filter(gruppo_id=int(self.kwargs['pk'])).order_by("-id").all()
        return messaggi


class TestView(ViewSet):

    def list(self, request):
        return Response("ciao", status=status.HTTP_200_OK)

    def post(self, request):
        return Response("hi", status=status.HTTP_200_OK)

    def get_permissions(self):
        permission_classes = [IsMember|ReadOnly]
        return [permission() for permission in permission_classes]


class GetMessaggiView(ViewSet):

    def list(self, request):
        return Response("ciao", status=status.HTTP_200_OK)

    def post(self, request):
        messaggi = Messaggio.objects.filter(gruppo_id=int(request.data['gid'])).order_by("-id")[:100]
        serializer = MessaggioSerializer(messaggi, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        permission_classes = [IsMember]
        return [permission() for permission in permission_classes]


class AppartenenzaList(APIView):
    """Sets a connection between characters and campaigns"""

    def get(self):
        return Response("Hi", status=status.HTTP_200_OK)

    def post(self, request, format=None):
        character_id = request.data['character_id']
        campaign_id = request.data['campaign_id']
        character = Personaggio.objects.get(id=character_id)
        if request.user.id != character.user_id:
            return Response("403", status=status.HTTP_403_FORBIDDEN)
        campaign = Campagna.objects.get(id=campaign_id)
        if request.user.id not in [u['utente_id'] for u in campaign.campagna_partecipa]:
            return Response("403", status=status.HTTP_403_FORBIDDEN)
        data = campaign.personaggi
        for elem in data:
            if elem.user_id == request.user.id:
                campaign.personaggi.remove(elem)
        return Response("OK", status.HTTP_200_OK)


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
