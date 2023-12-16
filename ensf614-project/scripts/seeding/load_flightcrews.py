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
from scripts.seeding.config import CREW_PER_FLIGHT
import pandas as pd
from datetime import date, timedelta
import random;
import math

#   MAIN FUNCTION
#-------------------------------------------------------#

def run():
    count = 0

    flights = Flight.objects.all()

    for flight in flights:
        for i in range(0, CREW_PER_FLIGHT):
            flight_crew = FlightCrew.objects.get_or_create(
                flight_id = Flight.objects.get(id=flight.id),
                crew_id = Crew.objects.order_by('?').first()
            )    
            count += 1    

    print("'FlightCrew' model successfully loaded (",count,")")

        
