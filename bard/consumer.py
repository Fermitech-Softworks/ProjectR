import json
import jwt
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from ProjectR.settings import SECRET_KEY, SIMPLE_JWT
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):

    async def getUser(self, token):
        self.user = User.objects.get(id=self.token['user_id'])

    async def connect(self):
        try:
            self.room_name = "gruppo"+self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = 'chat_%s' % self.room_name
            self.token = jwt.decode(self.scope['cookies']['token'], SECRET_KEY, algorithms=[SIMPLE_JWT['ALGORITHM']])
            # Join room group
            async_to_sync(self.getUser)
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
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'mittente': self.token['user_id']
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        mittente = event['mittente']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'mittente': mittente
        }))


class CampaignConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        try:
            self.room_name = "campagna"+self.scope['url_route']['kwargs']['room_name']
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
