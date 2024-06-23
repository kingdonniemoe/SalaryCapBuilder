from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from .models import Player, Roster
from .serializer import PlayerSerializer, RosterSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT

# Create your views here.
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class All_players(UserPermissions):
    def get(self, request, position):
        players = Player.objects.filter(position=position)
        serializer_players = PlayerSerializer(players, many=True)
        return Response(serializer_players.data)
    
class Create_roster(UserPermissions):
    def post(self, request):
        serializer = RosterSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            try:
                serializer.save(user=request.user)
                print(serializer.data)
                return Response(serializer.data, status=201)
            except Exception as e:
                return Response({'error': str(e)}, status=500)
        return Response(serializer.errors, status=400)
    
class Roster_summary(UserPermissions):
    def get(self, request):
        rosters = Roster.objects.filter(user=request.user)

        data = RosterSerializer(rosters, many=True).data
        return Response(data)
    
    def delete(self, request, roster_id):
        roster = Roster.objects.get(id=roster_id, user=request.user)
        roster.delete()
        return Response(status=HTTP_204_NO_CONTENT)
