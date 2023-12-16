#-------------------------------------------------------#
#   File Name: scripts/load_aircrafts.py
#   Description: Seeding script to load aircraft data to Aircraft model
#
#   Requirements:
#       - data/aircraft.csv
#
#   Returns:
#       - Populates database with Aircraft
#
#   Created By: Corey Yang-Smith
#   Date: November 13th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
from main.models import Aircraft
import pandas as pd

#   MAIN FUNCTION
#-------------------------------------------------------#

DATA_PATH = "scripts/seeding/data/aircraft.csv"

def run():
    count = 0

    df = pd.read_csv(DATA_PATH, header=None)
    columns = ['Company', 'Airplane_Type', 'Capacity', 'Rows', 'Col_Structure', 'Fuel_Per_KM']

    df.columns = columns
    for index, row in df.iterrows():
        aircraft = Aircraft.objects.get_or_create(
            company = row['Company'],
            type = row['Airplane_Type'],
            capacity = row['Capacity'],
            seat_rows = row['Rows'],
            seat_columns = row['Col_Structure'],
            fuel_per_km = row['Fuel_Per_KM'],
        )    
        count += 1    

    print("'Aircraft' model successfully loaded (",count,")")

        
