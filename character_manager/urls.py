from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', UserDetailViewSet, basename='user')
router.register(r'users', UserViewSet, basename='users')
router.register(r'characters', CharacterViewSet, basename='characters')
router.register(r'characters/create', CharacterCreationViewSet, basename='characters')
router.register(r'species', SpecieViewSet, basename="species")
router.register(r'classes', ClassViewSet, basename="classes")
router.register(r'abilities', AbilitaViewSet, basename="abilities")
router.register(r'spells', IncantesimoViewSet, basename="spells")
router.register(r'objects', OggettiViewSet, basename="objects")

urlpatterns = router.urls