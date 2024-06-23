from rest_framework import serializers
from .models import Player, Roster
from django.contrib.humanize.templatetags.humanize import intcomma

class PlayerSerializer(serializers.ModelSerializer):
    total_value = serializers.SerializerMethodField()
    apy = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = '__all__'
    
    def get_total_value(self,obj):
        return"${}".format(intcomma(obj.total_value))
    
    def get_apy(self,obj):
        return"${}".format(intcomma(obj.apy))
    
class RosterSerializer(serializers.ModelSerializer):
    player_count = serializers.IntegerField()
    cap_remaining = serializers.IntegerField()
    class Meta:
        model = Roster
        fields = ['id','player_count','cap_remaining']

