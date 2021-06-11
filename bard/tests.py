from django.test import TestCase
from character_manager.models import User
from rest_framework.test import APIClient


# Create your tests here.

class CampaignTest(TestCase):

    def test_user_create_campaign_and_retrieve(self):
        """
        A user should be able to create a new campaign and retrieve them.
        """
        client = APIClient()

        user = User.objects.create(username="user", password="test")
        client.force_authenticate(user=user)
        request = client.post("/bard/campaign/", {"titolo": "Test", "descrizione": "Test", "admin_id": user.id}, format="json")
        self.assertEqual(request.status_code, 201)

        request = client.get("/bard/campaign/")
        self.assertEqual(request.status_code, 200)

        request = client.delete("/bard/campaign/details/{}/".format(1))
        self.assertEqual(request.status_code, 204)

    def test_user_not_authorized(self):
        """
        An unauthorized user should not be able to create a new campaign and retrieve them.
        """
        client = APIClient()

        user = User.objects.create(username="user", password="test")
        request = client.post("/bard/campaign/", {"titolo": "Test", "descrizione": "Test", "admin_id": user.id}, format="json")
        self.assertEqual(request.status_code, 401)

        request = client.get("/bard/campaign/")
        self.assertEqual(request.status_code, 401)

        request = client.delete("/bard/campaign/details/{}/".format(1))
        self.assertEqual(request.status_code, 401)

    def test_user_impostor(self):
        """
        Another user should not be able to access a campaign hes not authorized to.
        """
        client = APIClient()

        user = User.objects.create(username="user", password="test")
        client.force_authenticate(user=user)
        request = client.post("/bard/campaign/", {"titolo": "Test", "descrizione": "Test", "admin_id": user.id}, format="json")

        impostor = User.objects.create(username="impostor", password="sus")
        client.force_authenticate(user=impostor)

        request = client.get("/bard/campaign/1/")
        self.assertEqual(request.status_code, 404)

        request = client.delete("/bard/campaign/details/{}/".format(1))
        self.assertEqual(request.status_code, 404)