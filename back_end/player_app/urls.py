from django.urls import path
from .views import All_players, Create_roster, Roster_summary


urlpatterns = [
    path('roster/', Create_roster.as_view()),
    path('user-rosters/', Roster_summary.as_view()),
    path('user-rosters/<int:roster_id>/', Roster_summary.as_view()),
    path("<str:position>/", All_players.as_view()),
]