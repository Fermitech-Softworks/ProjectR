from django.contrib import admin
from character_manager.models import *


# Register your models here.


class SpecieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'dettagli')
    search_fields = ['id', 'nome']


class OggettoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'costo')
    search_fields = ['id', 'nome']


class AbilitaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'attributo')
    search_fields = ('id', 'nome', 'attributo')


admin.site.register(Oggetto, OggettoAdmin)
admin.site.register(Abilita, AbilitaAdmin)
admin.site.register(Classe)
admin.site.register(Incantesimo)
admin.site.register(Specie, SpecieAdmin)
