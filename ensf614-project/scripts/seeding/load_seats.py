#-------------------------------------------------------#
#   File Name: scripts/load_seats.py
#   Description: Seeding script to load seat data to Seat model
#
#   Requirements:
#       - None
#
#   Returns:
#       - Populates database with Seat
#
#   Created By: Corey Yang-Smith
#   Date: November 13th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
from main.models import Seat, Aircraft
import pandas as pd
import random

#   MAIN FUNCTION
#-------------------------------------------------------#

'''
Note the logic for our seat type selection is built into this seeding script.
We assume that :
    - First 3 rows reserved for Business Class
    - Next 7 rows reserved for Comfort
    - Remaining is Ordinary

'''
BUSINESS_ROW = 3
COMFORT_ROW = 10


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

def run():
    count = 0

    aircrafts = Aircraft.objects.all()

    for aircraft in aircrafts:
        # Get Num of Rows
        rows = aircraft.seat_rows
        cols = process_string(aircraft.seat_columns)

        for i in range(rows):
            for j in range(cols):
                type = "ORD"
                multiplier = 1

                if i <= COMFORT_ROW: 
                    type = "CMF" 
                    multiplier = 1.4
                if i <= BUSINESS_ROW: 
                    type = "BUS"
                    multiplier = 2


                seat = Seat.objects.get_or_create(
                    type = type,
                    amount = 100,
                    multiplier = multiplier,
                    row_position = i,
                    column_position = j,
                    aircraft_ref = Aircraft.objects.get(pk = aircraft.pk)
                )    
                count += 1    

    print("'Seat' model successfully loaded (",count,")")

        
