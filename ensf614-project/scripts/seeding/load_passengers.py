#-------------------------------------------------------#
#   File Name: scripts/load_passengers.py
#   Description: Seeding script to randomly generate passenger data.
#
#   Requirements:
#       - config.py - PASSENGERS_PER_FLIGHT
#
#   Returns:
#       - Calls related functions to populate db with data
#
#   Created By: Corey Yang-Smith
#   Date: November 21st, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
from faker import Faker
from scripts.seeding.config import PASSENGERS_PER_FLIGHT
from main.models import Passenger, Flight


#   MAIN FUNCTION
#-------------------------------------------------------#
def run():
    count = 0
    # Create instance of Faker class
    faker = Faker()

    flights = Flight.objects.all()

    for flight in flights:

        for i in range(PASSENGERS_PER_FLIGHT):
            fake_name = faker.name().split()
            fake_first_name = fake_name[0]
            fake_last_name = fake_name[1]

            passenger = Passenger.objects.get_or_create(
                first_name=fake_first_name,
                last_name=fake_last_name,
                flight_id=Flight.objects.get(pk = flight.pk)
            )
            count += 1;
    print("'Passenger' model successfully generated (",count,")")

        
