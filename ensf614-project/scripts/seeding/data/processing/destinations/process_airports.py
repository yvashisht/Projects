import pandas as pd

df = pd.read_csv("airports.csv")

# Original Dataset found here
# https://ourairports.com/data/

'''
Column: type
Consider our airport only manages medium_airport and large_airport

'''

df = df[(df['type'] == "medium_airport") | (df['type'] == "large_airport")]

'''
drop the following columns
- id
- ident
- type
- elevation_ft
- iso_region
- scheduled_service
- gps_code
- local_code
- home_link
- wikipedia_link
- keywords
- municipality
- continent

keep
- lata_code
- name
- latitude_deg
- longitude_deg


'''

df = df.drop(columns=['id', 'ident', 'type', 'elevation_ft', 
                      'iso_region', 'scheduled_service', 'gps_code', 
                      'local_code', 'home_link', 'wikipedia_link', 'keywords',
                      'municipality', 'continent'])

'''
Drop not available lata code (eg. YYC)
'''
df = df.dropna()

'''
Round lat and long values to MAX 7 decimals
'''
df = df.round(decimals=7)

df.to_csv("processed_airports.csv")


