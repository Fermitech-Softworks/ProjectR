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
    search_fields = ['id', 'nome', 'attributo']
    list_filter = ('attributo',)


class ClasseAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')
    search_fields = ['id', 'nome']


class IncantesimoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'scuola', 'componenti')
    search_fields = ['id', 'nome', 'scuola']
    list_filter = ('scuola',)


admin.site.register(Oggetto, OggettoAdmin)
admin.site.register(Abilita, AbilitaAdmin)
admin.site.register(Classe, ClasseAdmin)
admin.site.register(Incantesimo, IncantesimoAdmin)
admin.site.register(Specie, SpecieAdmin)
