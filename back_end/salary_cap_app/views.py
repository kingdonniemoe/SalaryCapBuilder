from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication 
from rest_framework.authtoken.models import Token
from .models import User
# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        data = request.data
        data['username'] = request.data.get("username")
        new_user = User.objects.create_user(**data)
        if new_user is not None:
            new_token = Token.objects.create(user=new_user)
            return Response(
                {'user': new_user.username, 'token':new_token.key},
                status=HTTP_201_CREATED
            )
        return Response(status=HTTP_400_BAD_REQUEST)
    
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        return Response({"user": request.user.username})

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        user = authenticate(username = data.get("email"), password = data.get("password"))
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": user.username, 'token': token.key})
        return Response("Improper Credentials", status=HTTP_404_NOT_FOUND)