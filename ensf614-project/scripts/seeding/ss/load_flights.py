#-------------------------------------------------------#
#   File Name: scripts/load_flights.py
#   Description: Seeding script to generate flight information for each destination
#
#   Requirements:
#       - None
#
#   Returns:
#       - Populates database with Seat
#
#   Created By: Corey Yang-Smith
#   Date: November 18th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
from main.models import Flight, Aircraft, Destination, Crew, FlightCrew
from scripts.seeding.config import NUM_FLIGHTS_PER_DAY, NUM_DAYS
import pandas as pd
from datetime import date, timedelta, time, datetime
import random;
import math

#   MAIN FUNCTION
#-------------------------------------------------------#

def deg2rad(degree):
    return math.radians(degree)

def getDistance(start, end):
    R = 6371

    lat1 = start.latitude
    lon1 = start.longitude
    lat2 = end.latitude
    lon2 = end.longitude

    dLat = deg2rad(lat2-lat1)
    dLon = deg2rad(lon2-lon1)

    a = math.sin(dLat/2) * (math.sin(dLat/2)) + math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c # distance in km

    return d

def getTime(distance):
    PLANE_SPEED = 900 #km/h

    hours_full = distance / PLANE_SPEED
    hours = math.floor(hours_full)
    minutes_remaining = math.floor((hours_full-hours) * 60)

    duration = time(hours, minutes_remaining)

    return duration

def getRandomStartTime(date):
    randomHour = random.randint(0, 23)
    randomMinute = random.randint(0, 59)

    timestamp = datetime(year=date.year,
                        month=date.month,
                        day=date.day,
                        hour=randomHour,
                        minute=randomMinute)

    return timestamp

def getArrivalTime(datetime, duration):
    starting_datetime = datetime
    time_change = timedelta(hours=duration.hour, minutes=duration.minute) 
    ending_datetime = starting_datetime + time_change
    return ending_datetime

def run():
    count = 0

    for single_date in (date.today() + timedelta(n) for n in range(NUM_DAYS)):
        # print("Generating Flights for: ", single_date)

        # Generate Test Flights | YYC --> LAX
        start = Destination.objects.get(airport_code = "YYC")
        end = Destination.objects.get(airport_code = "LAX")
        distance = 1942
        est_duration = getTime(distance)

        departure_time = getRandomStartTime(single_date)
        arrival_time = getArrivalTime(departure_time, est_duration)

        flight = Flight.objects.get_or_create(
            date = single_date,
            departure_time = departure_time,
            arrival_time = arrival_time,
            start_point = start,
            end_point = end,
            distance = distance,
            est_duration = est_duration,

            aircraft_ref = Aircraft.objects.order_by('?').first(),
        )
        count += 1

        for i in range(NUM_FLIGHTS_PER_DAY):
            start = Destination.objects.order_by('?').first()
            end = Destination.objects.order_by('?').first()
            distance = getDistance(start, end)
            est_duration = getTime(distance)

            departure_time = getRandomStartTime(single_date)
            arrival_time = getArrivalTime(departure_time, est_duration)
                    

            flight = Flight.objects.get_or_create(
                date = single_date,
                departure_time = departure_time,
                arrival_time = arrival_time,
                start_point = start,
                end_point = end,
                distance = distance,
                est_duration = est_duration,
                aircraft_ref = Aircraft.objects.order_by('?').first(),
            )    
            count += 1    

    print("'Flight' model successfully loaded (",count,")")

        

'''
Alternative Logic for Generating Flights
... Flight could be a function of Aircrafts

For Each Aircraft:
    Initial aircraft selects random start destination and random end destination
    Afterwards, end destination is the next start destination
    Add random amount of 'layover time' at each location, then create new flight and select another end destination
    Repeat until the departure time exceeds the maximum planned flight
'''