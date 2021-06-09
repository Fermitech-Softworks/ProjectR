import json
import jwt
from asgiref.sync import async_to_sync, sync_to_async
from django.contrib.auth.models import User
from ProjectR.settings import SECRET_KEY, SIMPLE_JWT
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from bard.models import *
import datetime


class ChatConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def check_permissions(self):
        g = Gruppo.objects.get(id=self.group_id)
        if self.token['user_id'] not in [u['id'] for u in g.users.values()]:
            return False
        return True

    async def connect(self):
        try:
            self.room_name = "gruppo" + self.scope['url_route']['kwargs']['room_name']
            self.group_id = self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = 'chat_%s' % self.room_name
            self.token = jwt.decode(self.scope['cookies']['token'], SECRET_KEY, algorithms=[SIMPLE_JWT['ALGORITHM']])
            # Join room group
            check = await self.check_permissions()
            if not check:
                raise Exception
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        except Exception as e:
            await self.disconnect(108)

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def add_message_to_db(self, text_data):
        m = Messaggio.objects.create(contenuto=text_data['message'], ora=datetime.datetime.now(), utente_id=self.token['user_id'],
                                 gruppo_id=self.group_id)
        return m

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        m = await self.add_message_to_db(text_data_json)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'mittente': self.token['user_id'],
                'room_name': self.room_name
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        mittente = event['mittente']
        room_name = event['room_name']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'mittente': mittente,
            'room_name': room_name
        }))


class CampaignConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def check_permissions(self):
        campagna = Campagna.objects.get(id=self.campagna_id)
        if self.token['user_id'] not in [u['utente_id'] for u in campagna.campagna_partecipa.values() if u['comeDm']==True]:
            return False
        return True

    async def connect(self):
        try:
            self.room_name = "campagna" + self.scope['url_route']['kwargs']['room_name']
            self.campagna_id = self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = 'chat_%s' % self.room_name
            self.token = jwt.decode(self.scope['cookies']['token'], SECRET_KEY, algorithms=[SIMPLE_JWT['ALGORITHM']])
            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        except Exception as e:
            pass

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['gruppo']
        res = await self.check_permissions()
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'gruppo': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['gruppo']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'gruppo': message
        }))
