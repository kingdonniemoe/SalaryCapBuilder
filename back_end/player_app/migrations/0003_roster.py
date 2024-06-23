# Generated by Django 5.0.4 on 2024-04-16 18:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('player_app', '0002_alter_player_apy_alter_player_total_value'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Roster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cap_remaining', models.IntegerField()),
                ('players', models.ManyToManyField(to='player_app.player')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rosters', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
