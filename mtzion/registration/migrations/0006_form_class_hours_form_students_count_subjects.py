# Generated by Django 5.1.1 on 2024-10-03 22:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0005_registration_birth_certificate_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="form",
            name="class_hours",
            field=models.IntegerField(default=30),
        ),
        migrations.AddField(
            model_name="form",
            name="students_count",
            field=models.IntegerField(default=50),
        ),
        migrations.CreateModel(
            name="Subjects",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                (
                    "form",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subjects",
                        to="registration.form",
                    ),
                ),
            ],
        ),
    ]