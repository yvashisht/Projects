#-------------------------------------------------------#
#   File Name: main/views.py
#   Description: View Functions for Main
#
#   Requirements:
#       - urls
#
#   Renders:
#       - Authentication Routes
#       - Main Model REST
#
#   Created By: Corey Yang-Smith
#   Date: November 11th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
# Django Imports
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group

# Project imports
from .models import *
from .serializers import *

# DRF
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken

# Json
import json

#Import Stripe for payment
import stripe
stripe.api_key = 'sk_test_51OC8jgCQlBoyLNaW1dkWgLSmMYQEhVKLokKDp4hAJiUNIoZfPKNwBIFWyCZipJvE8Z21RilFobKzzBVrCohOuNNE00DoiyHW4z'

import mailchimp_marketing as MailchimpTransactional
from mailchimp_marketing.api_client import ApiClientError

# Sending Emails
from email.message import EmailMessage
import ssl
import smtplib

# Load Environment Variables
from dotenv import load_dotenv
import os
load_dotenv()
APP_PASSWORD = os.getenv('APP_PASSWORD')

# Random Code
import random
import string


#   VIEWS
#-------------------------------------------------------#
def MainView(request):
    return render(request, 'home/index.html')

@api_view(['GET', 'POST'])
def crews_list(request):
    if request.method == 'GET':
        data = Crew.objects.all()
        #print(data)
        serializer = CrewSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CrewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def destinations_list(request):
    if request.method == 'GET':
        data = Destination.objects.all()
        #print(data)
        serializer = DestinationSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def flights_list(request):
    if request.method == 'GET':
        data = Flight.objects.all()
        #print(data)
        serializer = FlightSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)    
    

@api_view(['GET'])
def seats_list(request):
    if request.method == 'GET':
        data = Seat.objects.all()
        #print(data)
        serializer = SeatSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)       

@api_view(['GET'])
def aircrafts_list(request):
    if request.method == 'GET':
        data = Aircraft.objects.all()
        #print(data)
        serializer = AircraftSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)             
    
    
@api_view(['GET'])
def crews_by_flight(request, flight_id):
    if request.method == 'GET':
        try:
            data = FlightCrew.objects.filter(flight_id=flight_id)
            print(data)
            serializer = FlightCrewSerializer(data, context={'request': request}, many=True)
        except Flight.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data)


@api_view(['GET', 'DELETE'])
def tickets_detail(request, payload):
    if request.method == "GET":
        try:
            ticket = Ticket.objects.filter(id=payload)
            serializer = TicketSerializer(ticket, context={'request': request}, many=True)
        except Ticket.DoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        ticket_id = payload
        try:
            ticket = Ticket.objects.filter(id=ticket_id)
            serializer = TicketSerializer(ticket, context={'request': request}, many=True)
            send_cancellation_email(ticket_info=ticket)
            ticket.delete()
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data)

@api_view(['GET', 'DELETE'])
def promos_detail(request, payload):
    if request.method == "GET":
        try:
            promo = Promotion.objects.filter(code=payload)
            serializer = PromotionSerializer(promo, context={'request': request}, many=True)
        except Promotion.DoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        promo_id = payload
        try:
            promo = Promotion.objects.filter(code=promo_id)
            serializer = PromotionSerializer(promo, context={'request': request}, many=True)
            promo.delete()
        except Promotion.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data)

@api_view(['GET'])
def passengers_by_flight(request, flight_id):
    if request.method == 'GET':
        try:
            data = Ticket.objects.filter(flight_ref=flight_id)
            serializer = TicketSerializer(data, context={'request': request}, many=True)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data)
    
@api_view(['GET'])
def ticketsbyflight_list(request, payload):
    if request.method == 'GET':
        flight_id = payload
        try:
            flight = Flight.objects.filter(pk=payload)[0]
            data = Ticket.objects.filter(flight_ref=flight)
            serializer = TicketSerializer(data, context={'request': request}, many=True)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data)
    
@api_view(['GET'])
def aircraft_seat_list(request, payload):
    if request.method == 'GET':
        aircraft_id = payload
        try:
            aircraft = Aircraft.objects.filter(pk=aircraft_id)[0]
            data = Seat.objects.filter(aircraft_ref=aircraft)
            serializer = SeatSerializer(data, context={'request': request}, many=True)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data)


    
@api_view(['GET'])
def query_flights(request):
    print("Initial Query")
    if request.method == 'GET':
        # Process Request o Object
        dump = json.dumps(request.GET)
        body = json.loads(dump)    

        # Initialize Values from JSON, to filter
        start_point_id = body['info[start_point][id]']
        end_point_id = body['info[end_point][id]']
        date = body['info[date]']

        try:
            start_point = Destination.objects.get(id=start_point_id)
            end_point = Destination.objects.get(id=end_point_id)
            data = Flight.objects.filter(start_point=start_point, end_point=end_point, date=date)
            serializer = FlightSerializer(data, context={'request': request}, many=True)
        except Flight.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data)    


# Add these views for user registration, login, and logout
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Add the user to the "normal user" group
        group = Group.objects.get(name='normal user')
        user.groups.add(group)

        # Create Promo for New User
        promo = Promotion.objects.get_or_create(
            user = user,
            code = generate_random_promo_code()
        )

        refresh = RefreshToken.for_user(user)
        res = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(res, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    refresh = RefreshToken.for_user(user)
    res = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'groups': [group.name for group in user.groups.all()],  # Add the user's groups to the response
    }
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def process_payment(request):
    data = request.data
    print("#---------#")
    print(data)
    print("#---------#")
    print(data['total'])
    print("#---------#")
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=int(float(data['total']) * 100),
            currency='usd',
            payment_method_types=['card'],
        )
        flight_details = data['flightDetails']
        seat_details = data['seatDetails']
        user_info = data['userInfo']

        flight_id = data['flightDetails']['id']
        seat_id = data['seatDetails']['id']
        name = data['userInfo']['name']
        email = data['userInfo']['email']

        flight = Flight.objects.get(id=flight_id)
        seat = Seat.objects.get(id=seat_id)

        ticket = Ticket.objects.create(
            flight_ref=flight,
            seat_ref=seat,
            name=name,
            email=email
        )

        try:
            send_confirmation_email(user_info=user_info, flight_details=flight_details, seat_details=seat_details, ticket_info=ticket)
            send_transaction_email(user_info=user_info, flight_details=flight_details, seat_details=seat_details, ticket_info=ticket, total=data['total'])
        except ApiClientError as e:
            print(f"Mailchimp error: {str(e)}")

        return Response({"clientSecret": payment_intent['client_secret']}, status=status.HTTP_200_OK)

    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

def process_seat_location(row, column):
    column = chr(ord('@')+column)
    string = str(row) + column
    return string


def process_datetime_to_time(datetime):
    string = str(datetime)
    date = string[0:10]
    time = string[-8:]
    value = date + " @ " + time
    return value


def send_cancellation_email(ticket_info):
    print("----- ticket info -----")
    ticket_info = ticket_info[0]
    print("----- ticket info -----")
    # Ticket Info
    field_object = ticket_info._meta.get_field('id')
    t_id = field_object.value_from_object(ticket_info)  

    field_object = ticket_info._meta.get_field('name')
    u_name = field_object.value_from_object(ticket_info)  

    field_object = ticket_info._meta.get_field('email')
    u_email = field_object.value_from_object(ticket_info)          

    field_object = ticket_info._meta.get_field('flight_ref')  
    f_id = field_object.value_from_object(ticket_info)

    try:
        email_sender = 'yangsmith.corey@gmail.com'
        email_password = APP_PASSWORD
        email_receiver = u_email



        subject = "Flight " + str(f_id) + " Cancellation"
        body = f'''
            ---- CANCELLATION CONFIRMATION ----
            Ticket ID: {t_id}
            Flight ID: {f_id}

            ----------------------------------
            We will not give you a refund!
            FLIGHT.LY TEAM
            '''

        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
            print("Cancellation Email - Successfully Sent")
    except Exception as e:
        print("Error: ", e)    

    pass


@login_required
def get_user_groups(request):
    group_names = [group.name for group in request.user.groups.all()]
    return JsonResponse({'groups': group_names}, safe=False)


def send_transaction_email(user_info, flight_details, seat_details, ticket_info, total):
    try:
        email_sender = 'yangsmith.corey@gmail.com'
        email_password = APP_PASSWORD
        email_receiver = user_info['email']

        # Transaction Info
        t_total = "$" + str(total)

        # Flight Info
        f_id = str(flight_details['id'])        

        # Ticket Info
        field_object = ticket_info._meta.get_field('id')
        t_id = field_object.value_from_object(ticket_info)

        # Seat Info
        s_id = str(seat_details['id'])

        subject = "Flight " + f_id + " Confirmation | " + "PAID"
        body = f'''
            ---- TRANSACTION CONFIRMATION ----
            Ticket ID: {t_id}
            Flight ID: {f_id}
            Seat ID: {s_id}

            Total Amount Paid:
            {t_total}

            ----------------------------------

            Enjoy your flight!
            FLIGHT.LY TEAM
            '''
        
        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
            print("Transaction Confirmation Email - Successfully Sent")
    except Exception as e:
        print("Error: ", e)

def generate_random_promo_code(length=20):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string


def send_confirmation_email(user_info, flight_details, seat_details, ticket_info):
    try:
        email_sender = 'yangsmith.corey@gmail.com'
        email_password = APP_PASSWORD
        email_receiver = user_info['email']

        # Flight Info
        f_id = str(flight_details['id'])
        f_dur = str(flight_details['est_duration'])
        f_dis = str(int(flight_details['distance']))

        f_s_code = flight_details['start_point']['airport_code']
        f_s_airport = flight_details['start_point']['name']
        f_s_time = process_datetime_to_time(flight_details['departure_time'])

        f_e_airport = flight_details['end_point']['name']
        f_e_code = flight_details['end_point']['airport_code']
        f_e_airport = flight_details['end_point']['name']
        f_e_time = process_datetime_to_time(flight_details['arrival_time'])

        # Ticket Info
        field_object = ticket_info._meta.get_field('id')
        t_id = field_object.value_from_object(ticket_info)

        # Seat Info
        s_id = str(seat_details['id'])
        s_type = seat_details['type']
        s_location = process_seat_location(seat_details['row_position'], seat_details['column_position'])

        subject = "Flight " + f_id + " Confirmation | " + f_s_code + " to " + f_e_code
        body = f'''
            ---- TICKET INFORMATION ----
            Ticket ID: {t_id}
            To cancel a ticket, please visit http://localhost:5173/cancel and enter your ticket ID.

            ---- FLIGHT DETAILS ----
            Flight ID: {f_id}
            {f_s_code} to {f_e_code}
            Estimated Flight Duration: {f_dur}
            Total Distance Travelled: {f_dis}km

            ---- DEPARTURE INFORMATION ----
            Departing from: {f_s_airport} ({f_s_code})
            Departure Time: {f_s_time}

            ---- ARRIVAL INFORMATION ----
            Arriving from: {f_e_airport} ({f_e_code})
            Arrival Time: {f_e_time}            
            
            ---- SEAT DETAILS ----
            Seat ID: {s_id}
            Seat Type: {s_type}
            Seat Location: {s_location}

            ----------------------------------
            
            Enjoy your flight!
            FLIGHT.LY TEAM
            '''
        
        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
            print("Flight Details Confirmation Email - Successfully Sent")
    except Exception as e:
        print("Error: ", e)


    #     mailchimp = MailchimpTransactional.Client()
    #     mailchimp.set_config({
    #         "api_key": 'md-YpFrXnaqFAMb_zQf8SfXtQ',
    #     })
    #     print(mailchimp)
    #     response = mailchimp.users.ping()
    #     print('API called successfully: {}'.format(response))
    # except ApiClientError as error:
    #     print('An exception occurred: {}'.format(error.text))


    # client.set_config({
    #     "api_key": "c1a49180918fcbdd0d919c333a2f9fe9-us21",
    #     "server": "us21"
    # })

    # email_content = f"Flight Details: {flight_details}"

    # message = {
    #     "from_email": "yajur.vashisht@ucalgary.ca",
    #     "subject": "Your Flight Details",
    #     "text": email_content,
    #     "to": [{"email": email}]
    # }
    # try:
    #     response = client.messages.send(message=message)
    #     print("Email sent: ", response)
    # except ApiClientError as error:
    #     print(f"Error: {error}")
    
