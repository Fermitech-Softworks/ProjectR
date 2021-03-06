from django.urls import re_path

from bard import consumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumer.ChatConsumer.as_asgi()),
    re_path(r'ws/campaign/(?P<room_name>\w+)/$', consumer.CampaignConsumer.as_asgi())
]