# Generated by Django 3.0.8 on 2020-08-04 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='listing_desc',
            field=models.TextField(),
        ),
    ]
