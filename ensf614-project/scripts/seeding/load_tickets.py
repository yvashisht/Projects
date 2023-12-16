#-------------------------------------------------------#
#   File Name: scripts/load_tickets.py
#   Description: Seeding script to load ticket data to Ticket model, and adjust Seat model accordingly
#
#   Requirements:
#       - None
#
#   Returns:
#       - Populates database with Ticket, adjusts Seat
#
#   Created By: Corey Yang-Smith
#   Date: November 13th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
from main.models import Seat, Flight, Ticket
from faker import Faker
import pandas as pd
import random

#   MAIN FUNCTION
#-------------------------------------------------------#
def process_string(input_str):
    '''
    process_string

    Args:
        input_str (String): takes in column string for Aircraft eg. 3-4-3
    
    Returns:
        result (int): Integer value that is the sum of the seats
    
    '''
    numbers = input_str.split("-")
    result = sum(int(num) for num in numbers)

    return result

def random_availability():
    '''
    random_availability
    
    Args:
        None

    Returns:
        result (boolean): Randomly selected boolean value
    '''
    AVAILABILITY_CHANCE = 0.75
    return random.random() < AVAILABILITY_CHANCE

def run():
    count = 0
    faker=Faker()
    flights = Flight.objects.all()

    for flight in flights:
        seats = Seat.objects.filter(aircraft_ref = flight.aircraft_ref.pk)

        for seat in seats:
            if (random_availability()):
                fake_name = faker.name()
                fake_email = faker.email()

                # Create new Ticket object
                ticket = Ticket.objects.get_or_create(
                    flight_ref = Flight.objects.get(pk = flight.pk),
                    seat_ref = Seat.objects.get(pk = seat.pk),
                    name = fake_name,
                    email = fake_email,
                )    
                count += 1    

    print("'Ticket' model successfully loaded (",count,")")

        
