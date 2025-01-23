from rest_framework import serializers

# serializers.py > Serializer,ModelSerializer(create,update)

from api.models import Lead


class LeadSerializer(serializers.ModelSerializer):

    class Meta:

        model=Lead

        fields="__all__"

        read_only_fields=["id","created_date","updated_at"]


       

