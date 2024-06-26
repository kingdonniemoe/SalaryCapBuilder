# Generated by Django 5.0.4 on 2024-04-11 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('player', models.CharField()),
                ('position', models.CharField()),
                ('team', models.CharField()),
                ('total_value', models.DecimalField(decimal_places=2, max_digits=20)),
                ('apy', models.DecimalField(decimal_places=2, max_digits=20)),
                ('total_guaranteed', models.DecimalField(decimal_places=2, max_digits=20)),
                ('avg_guaranteed', models.DecimalField(decimal_places=2, max_digits=20)),
                ('percent_guaranteed', models.DecimalField(decimal_places=2, max_digits=20)),
                ('player_id', models.IntegerField(primary_key=True, serialize=False, unique=True)),
            ],
        ),
    ]
