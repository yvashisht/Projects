#-------------------------------------------------------#
#   File Name: scripts/load_destinations.py
#   Description: Seeding script to load worldcities data to Destinations
#
#   Requirements:
#       - data/worldcities.csv
#
#   Returns:
#       - Populates database with Destinations
#
#   Created By: Corey Yang-Smith
#   Date: November 11th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
from main.models import Destination
import pandas as pd


#   MAIN FUNCTION
#-------------------------------------------------------#
DATA_PATH = "scripts/seeding/data/destinations.csv"

def run():
    count = 0

    df = pd.read_csv(DATA_PATH, header=None)
    columns = ['Airport', 'Latitude', 'Longitude', 'Airport_Code']

    df.columns = columns

    # North America Lat and Long values
    NORTH = 71
    SOUTH = 12
    WEST = -168
    EAST = -50

    df['Latitude'] = df['Latitude'].astype(float)
    df['Longitude'] = df['Longitude'].astype(float)

    # Filter the dataframe to only include destinations within North America
    df = df[(df['Latitude'].between(SOUTH, NORTH)) & (df['Longitude'].between(WEST, EAST))]

    for index, row in df.iterrows():
        destination = Destination.objects.get_or_create(
            name=row['Airport'],
            airport_code=row['Airport_Code'],
            latitude=row['Latitude'],
            longitude=row['Longitude']
        )    
        count += 1    

    print("'Destination' model successfully loaded (",count,")")

        
