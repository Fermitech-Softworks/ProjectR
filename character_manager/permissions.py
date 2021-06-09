from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import View
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


class AdminOrSelf(permissions.BasePermission):
    def has_permission(self, request: Request, view: View) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        if user.is_superuser:
            return True
        return True

    def has_object_permission(self, request: Request, view: View, obj) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        if user.is_superuser:
            return True
        if user.id == obj.id:
            return True
        return False


class AdminOrOwner(permissions.BasePermission):
    def has_permission(self, request: Request, view: View) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        return True

    def has_object_permission(self, request: Request, view: View, obj) -> bool:
        user: User = request.user
        if user.is_anonymous:
            return False
        if user.is_superuser:
            return True
        if user.id == obj.user_id:
            return True
        return False