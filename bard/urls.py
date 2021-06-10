from django.urls import path

from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'campaign', CampagnaViewSet, basename='campaign')
router.register(r'campaign/details', CampagnaDetailsViewSet, basename='campaign/details')
router.register(r'campaign/full', CampagnaCreateViewSet, basename='campaign/create')
router.register(r'campaign/characters', CampagnaGetInfoPersonaggio, basename='campaign/character')
router.register(r'group', GruppoViewSet, basename="group")
router.register(r'group/details', GruppoDetailsViewSet, basename="group/details")
router.register(r'messages', GetMessaggiView, basename="group/messages")
router.register(r'partecipation/set', AppartenenzaView, basename="campaign/characters")

urlpatterns = router.urls