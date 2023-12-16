#-------------------------------------------------------#
#   File Name: main/serializers.py
#   Description: Serializers for Django Models
#
#   Requirements:
#       - TODO
#
#   Returns:
#       - Authentication Routes
#       - Main Model REST
#
#   Created By: Corey Yang-Smith
#   Date: November 11th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#


# Django Imports
from .models import *
import datetime

# Django Authentication
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

# Django Rest Framework (DRF) Imports
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


#   SERIALIZERS
#-------------------------------------------------------#
class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew      
        fields = '__all__'
        
class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination      
        fields = '__all__'        

class AircraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aircraft  
        fields = '__all__'            


class FlightSerializer(serializers.ModelSerializer):
    start_point = DestinationSerializer()
    end_point = DestinationSerializer()
    aircraft_ref = AircraftSerializer()

    class Meta:
        model = Flight      
        fields = '__all__'          

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat      
        fields = '__all__'          

class FlightCrewSerializer(serializers.ModelSerializer):
    crew_id = CrewSerializer()
    flight_id = FlightSerializer()
    class Meta:
        model = FlightCrew
        fields = '__all__'      

class TicketSerializer(serializers.ModelSerializer):
    flight_ref = FlightSerializer()
    seat_ref = SeatSerializer()
    class Meta:
        model = Ticket
        fields = '__all__'

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'        

# Add these serializers for user registration and login - Atif
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Incorrect username or password.")
        if not user.is_active:
            raise serializers.ValidationError("User is deactivated.")
        return {'user': user}

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')  # Add 'first_name' and 'last_name'
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }


    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data['first_name'],  # Add this
            last_name=validated_data['last_name'],  # Add this
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user