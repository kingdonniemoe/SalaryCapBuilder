# Generated by Django 5.0.4 on 2024-04-18 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('player_app', '0004_roster_player_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roster',
            name='players',
        ),
        migrations.AddField(
            model_name='roster',
            name='player',
            field=models.ManyToManyField(to='player_app.player'),
        ),
    ]
