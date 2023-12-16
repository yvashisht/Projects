import pandas as pd

# Original Dataset found here
# https://simplemaps.com/data/world-cities
# (Basic)

df = pd.read_csv("worldcities.csv")

'''
Map iso2 to iso3 in airports dataset

'''


df = df.drop(columns=['city', 'city_ascii', 'lat', 'lng', 
                      'country', 'admin_name', 'capital', 
                      'population', 'id'])


df.to_csv("processed_worldcities.csv")


