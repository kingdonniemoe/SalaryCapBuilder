from django.db import models

from salary_cap_app.models import User

# Create your models here.
class Player(models.Model):
    player = models.CharField()
    position = models.CharField()
    team = models.CharField()
    total_value = models.DecimalField(max_digits=20, decimal_places=0)
    apy = models.DecimalField(max_digits=20, decimal_places=0)
    total_guaranteed = models.DecimalField(max_digits=20, decimal_places=2)
    avg_guaranteed = models.DecimalField(max_digits=20, decimal_places=2)
    percent_guaranteed = models.DecimalField(max_digits=20, decimal_places=2)
    player_id = models.IntegerField(unique=True, primary_key=True)

class Roster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rosters')
    players = models.ManyToManyField(Player)
    cap_remaining = models.IntegerField()
    player_count = models.IntegerField(default=0)