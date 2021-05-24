from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', UserDetailViewSet, basename='user')
router.register(r'users', UserViewSet, basename='users')
router.register(r'characters', CharacterViewSet, basename='characters')

urlpatterns = router.urls