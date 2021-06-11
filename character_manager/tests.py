from django.test import TestCase
from character_manager.models import User, Specie, Personaggio, Oggetto, Incantesimo, Abilita, Classe
from character_manager.views import UserDetailViewSet, CharacterViewSet, CharacterCreationViewSet
from rest_framework.test import APIRequestFactory, force_authenticate


# Create your tests here.


class UserTest(TestCase):

    def test_get_data_authorized(self):
        """
        A registered user shoud be able to retrive data about himself.
        """
        factory = APIRequestFactory()

        user = User.objects.create(username="admin", is_superuser=True, password="test")
        view = UserDetailViewSet.as_view({'get': 'list'})

        request = factory.get('/artificier/user')
        force_authenticate(request, user)
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['results'][0]['username'], user.username)

    def test_get_data_unauthorized(self):
        """
        An unregistered user shoud not be able to retrive data about himself.
        """
        factory = APIRequestFactory()
        view = UserDetailViewSet.as_view({'get': 'list'})

        request = factory.get('/artificier/user')
        response = view(request)
        self.assertEqual(response.status_code, 401)


class CharacterTest(TestCase):

    def test_create_character_no_auth(self):
        """
        An unregistered user shoud not be able to create characters.
        """
        factory = APIRequestFactory()
        user = User.objects.create(username="gastani", is_superuser=False, password="test")
        specie = Specie.objects.create(nome="Elfi", dettagli="Bla bla")

        view = CharacterViewSet.as_view({'get': 'retrieve', 'post': 'create'})
        request = factory.post('/artificier/characters', {"nome": "Frinzi", "pv_max": 100, "pv_attuali": 100,
                                                          'classe_armatura': 15, 'capacita': 3, "livello": 6,
                                                          "forza": 10, "destrezza": 10, "intelligenza": 10,
                                                          "saggezza": 10,
                                                          "carisma": 10, "costituzione": 10, "note": "Bla bla bla",
                                                          "specie": specie.id})
        response = view(request)
        self.assertEqual(response.status_code, 401)

    def test_create_character_and_retrive(self):
        """
        A registered user shoud be able to create characters, and get details about them.
        """
        factory = APIRequestFactory()
        user = User.objects.create(username="gastani", is_superuser=False, password="test")
        specie = Specie.objects.create(nome="Elfi", dettagli="Bla bla")

        view = CharacterViewSet.as_view({'post': 'create'})
        request = factory.post('/artificier/characters', {"nome": "Frinzi", "pv_max": 100, "pv_attuali": 100,
                                                          'classe_armatura': 15, 'capacita': 3, "livello": 6,
                                                          "forza": 10, "destrezza": 10, "intelligenza": 10,
                                                          "saggezza": 10,
                                                          "carisma": 10, "costituzione": 10, "note": "Bla bla bla",
                                                          "specie": specie.id, "user": user.id})
        force_authenticate(request, user)
        response = view(request)
        self.assertEqual(response.status_code, 201)

        character = Personaggio.objects.filter(nome="Frinzi").get()
        request = factory.get('/artificier/characters/')
        force_authenticate(request, user)
        view = CharacterViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk='{}'.format(character.id))
        self.assertEqual(response.status_code, 200)

        view = CharacterCreationViewSet.as_view(
            {'delete': 'destroy'})
        request = factory.delete('/artificier/characters/details')
        force_authenticate(request, user)
        response = view(request, pk='{}'.format(character.id))
        self.assertEqual(response.status_code, 204)

    def test_create_character_and_manage_as_other(self):
        """
        A user should not be able to access characters of other players, because the
        queryset restrictions wont allow him. If this works, so will the update of characters and deletion.
        """
        factory = APIRequestFactory()
        user = User.objects.create(username="gastani", is_superuser=False, password="test")
        specie = Specie.objects.create(nome="Elfi", dettagli="Bla bla")

        view = CharacterViewSet.as_view({'post': 'create', 'get': 'retrieve'})
        request = factory.post('/artificier/characters', {"nome": "Frinzi", "pv_max": 100, "pv_attuali": 100,
                                                          'classe_armatura': 15, 'capacita': 3, "livello": 6,
                                                          "forza": 10, "destrezza": 10, "intelligenza": 10,
                                                          "saggezza": 10,
                                                          "carisma": 10, "costituzione": 10, "note": "Bla bla bla",
                                                          "specie": specie.id, "user": user.id})
        force_authenticate(request, user)
        response = view(request)
        self.assertEqual(response.status_code, 201)

        character = Personaggio.objects.filter(nome="Frinzi").get()
        request = factory.get('/artificier/characters/')
        impostor = User.objects.create(username="impostor", is_superuser=False, password="test")
        force_authenticate(request, impostor)
        response = view(request, pk='{}'.format(character.id))
        self.assertEqual(response.status_code, 404)

        view = CharacterCreationViewSet.as_view(
            {'post': 'create', 'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})
        request = factory.delete('/artificier/characters/details')
        force_authenticate(request, impostor)
        response = view(request, pk='{}'.format(character.id))
        self.assertEqual(response.status_code, 404)

        request = factory.put('/artificier/characters/', {"nome": "Frinzoni", "pv_max": 100, "pv_attuali": 100,
                                                          'classe_armatura': 15, 'capacita': 3, "livello": 6,
                                                          "forza": 10, "destrezza": 10, "intelligenza": 10,
                                                          "saggezza": 10,
                                                          "carisma": 10, "costituzione": 10, "note": "Bla bla bla",
                                                          "specie": specie.id, "user": user.id})
        force_authenticate(request, impostor)
        response = view(request, pk='{}'.format(character.id))
        self.assertEqual(response.status_code, 404)

    def test_character_validity(self):
        specie = Specie.objects.create(nome="Elfi", dettagli="Bla bla")
        user = User.objects.create(username="gastani", is_superuser=False, password="test")
        character = Personaggio.objects.create(nome="Frinzi", pv_max=100, pv_attuali=100, classe_armatura=15,
                                               capacita=3, livello=6, forza=10, destrezza=10, intelligenza=10,
                                               saggezza=10, carisma=10, costituzione=10, note="",
                                               specie_id=specie.id,
                                               user_id=user.id)
        res = character.is_sheet_valid()
        self.assertEqual(res, True)
        lista = [6, 10, 10, 10, 10, 10, 10]
        for elem in range(0, len(lista), 1):
            lista[elem] = lista[elem]*10
            character = Personaggio.objects.create(nome="Frinzi", pv_max=100, pv_attuali=100, classe_armatura=15,
                                                   capacita=3, livello=lista[0], forza=lista[1], destrezza=lista[2], intelligenza=lista[3],
                                                   saggezza=lista[4], carisma=lista[5], costituzione=lista[6], note="",
                                                   specie_id=specie.id,
                                                   user_id=user.id)
            res = character.is_sheet_valid()
            self.assertEqual(res, False)
            lista[elem] = int(lista[elem]/10)