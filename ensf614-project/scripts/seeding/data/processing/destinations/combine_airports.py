import pandas as pd

# Original Dataset found here
# https://simplemaps.com/data/world-cities
# (Basic)

df = pd.read_csv("processed_worldcities.csv")
df2 = pd.read_csv("processed_airports.csv")

'''
Map iso2 to iso3 in airports dataset

'''

frames = [df, df2]

# result = pd.merge(df, df2, left_on="iso2", right_on="iso_country", how="inner")
# result = result.drop("iso2", axis=1)
# result = result.drop("iso_country", axis=1)

iso_mapping = dict(zip(df['iso2'], df['iso3']))

df2['country_code'] = df['iso2'].map(iso_mapping)
print(df2.head())
df2 = df2.drop(columns=['iso_country', 'Unnamed: 0'])
print("\n\n")
print(df2.head())

df2.to_csv("destinations.csv")





