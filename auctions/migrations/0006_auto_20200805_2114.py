# Generated by Django 3.0.8 on 2020-08-05 21:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0005_listing_listing_owner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='listing_status',
            new_name='listing_open',
        ),
    ]
