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
from scripts.seeding.config import NUM_DAYS
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

def getRandomLayover(datetime):
    starting_datetime = datetime
    randomMinute = random.randint(0, 59)
    time_change = timedelta(minutes=randomMinute)
    ending_datetime = starting_datetime + time_change
    return ending_datetime

def getArrivalTime(datetime, duration):
    starting_datetime = datetime
    time_change = timedelta(hours=duration.hour, minutes=duration.minute) 
    ending_datetime = starting_datetime + time_change
    return ending_datetime

def getTimeCutoff():
    now = date.today()
    max_delta = timedelta(days=NUM_DAYS)
    cutoff = now + max_delta
    return cutoff

def getDate(datetime):
    date = datetime.date()
    return date

def run():
    count = 0

    aircrafts = Aircraft.objects.all()

    for aircraft in aircrafts:
        # initial flight is random start and end date
        initial_time = date.today()
        start = Destination.objects.order_by('?').first()
        end = Destination.objects.order_by('?').first()

        departure_time = getRandomStartTime(initial_time)
        distance = getDistance(start, end)
        est_duration = getTime(distance)
        arrival_time = getArrivalTime(departure_time, est_duration)
        
        flight = Flight.objects.get_or_create(
            date = initial_time,
            departure_time = departure_time,
            arrival_time = arrival_time,
            start_point = start,
            end_point = end,
            distance = distance,
            est_duration = est_duration,

            aircraft_ref = Aircraft.objects.filter(pk=aircraft.pk)[0]
        )
        count += 1

        # subsequent flights will be linked from the end destination, and will begin after a random layover time
        while (departure_time.date() < getTimeCutoff()):
            start = end
            end = Destination.objects.order_by('?').first()
            departure_time = getRandomLayover(arrival_time)
            distance = getDistance(start, end)
            est_duration = getTime(distance)
            arrival_time = getArrivalTime(departure_time, est_duration)

            flight = Flight.objects.get_or_create(
                date = getDate(departure_time),
                departure_time = departure_time,
                arrival_time = arrival_time,
                start_point = start,
                end_point = end,
                distance = distance,
                est_duration = est_duration,

                aircraft_ref = Aircraft.objects.filter(pk=aircraft.pk)[0]
            )
            count += 1

    print("'Flight' model successfully loaded (",count,")")