from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import View
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from bard.models import Partecipa, Campagna
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsDM(permissions.BasePermission):
    def has_permission(self, request: Request, view: View) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        return True

    def has_object_permission(self, request: Request, view: View, obj) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        if type(obj).__name__ == 'Gruppo':
            campagna = obj.campagna
        else:
            campagna = obj

        if Partecipa.objects.filter(campagna=campagna, utente=user) and request.method in ['GET', 'POST', 'HEAD',
                                                                                           'OPTIONS']:
            return True
        if Partecipa.objects.filter(campagna=campagna, utente=user, comeDm=True):
            return True

        return False


class IsDmCharacter(permissions.BasePermission):
    def has_permission(self, request: Request, view: View) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        return True

    def has_object_permission(self, request: Request, view: View, obj) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        partecipazioni: [Partecipa] = user.utente_partecipa.filter(comeDm=True).all()
        campagne = [p.campagna for p in partecipazioni]
        personaggi_id = []
        for campagna in campagne:
            campagna: Campagna
            for personaggio in campagna.personaggi.all():
                personaggi_id.append(personaggio.id)
        if obj.id in personaggi_id:
            return True
        return False


class IsMember(permissions.BasePermission):
    def has_permission(self, request: Request, view: View) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        user: User = request.user
        if user.is_anonymous:
            return False
        if user.utente_partecipa.filter(campagna=obj.messaggio_gruppo.campagna) and user.utenti_gruppo.filter(
                id=obj.gruppo_id):
            return True
        return False
