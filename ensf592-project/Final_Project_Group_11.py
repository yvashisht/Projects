## Spring 23 Final Project - Group 11
# By: Balkarn Gill, Yajur Vashisht
# All commits and code were completed by both of us together in person.

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Three separate datasets are merged into a large set.

data_2020 = pd.read_csv(r'./formula1_2020season_raceResults.csv')
data_2021 = pd.read_csv(r'./formula1_2021season_raceResults.csv')
data_2022 = pd.read_csv(r'./formula1_2022season_raceResults.csv')
dataset = pd.concat([data_2020,data_2021,data_2022])

# Data is stored as a multiindexed DataFrame.
dataset.set_index(['Track','Year','Driver','Team','No'],inplace=True)

# Data is sorted according to the indices.
dataset = dataset.sort_index(level='Year')

# Masking operation to remove drivers who did not score points.
dataset = dataset[dataset['Points'] > 0]

# All duplicated columns/rows are deleted. 
dataset = dataset.drop_duplicates()

# The 'No' index is deleted from the dataset.
dataset = dataset.droplevel('No')

# Groupby operation to find the team scored points at a race track.
dataset['Team Points'] = dataset.groupby(['Team', 'Track'])['Points'].transform('sum')

# Read the driver ratings dataset.
driver_ratings = pd.read_csv(r'./formula1_driver_ratings.csv')

# Merge the 'Year', 'Driver', and 'Rating' columns into a new dataset.
ratings_dataset = dataset.reset_index().merge(driver_ratings[['Year', 'Driver', 'Rating']], on=['Year', 'Driver'], how='left')

# Adding a 'Possitions Gained' column which is the difference between the starting position and final position.
dataset['Starting Grid'] = pd.to_numeric(dataset['Starting Grid'], errors='coerce')
dataset['Position'] = pd.to_numeric(dataset['Position'], errors='coerce')
dataset['Positions Gained'] = np.where(dataset['Position'].isna() | dataset['Starting Grid'].isna(), np.nan, dataset['Starting Grid'] - dataset['Position'])

"""
This function prompts the user for a specific team and provides the corresponding total points in each year.
    Parameters:
    dataset (pd.DataFrame): A multiindexed DataFrame containing Formula 1 race results.

    Returns:
    None, but prints total points for the specified team in each year.
"""
def get_team_stats(dataset):
    team_name = input("Enter team name (e.g Ferrari): ")
    if team_name not in dataset.index.get_level_values('Team'):
        print("This team does not exist in the dataset.")
    else:
        team_data = dataset.loc[dataset.index.get_level_values('Team') == team_name]
        for year in team_data.index.get_level_values('Year').unique():
            year_data = team_data.loc[team_data.index.get_level_values('Year') == year]
            total_points = year_data['Points'].sum()
            print(f"Total points for {team_name} in {year}: {total_points}")

"""
This function prompts the user to input a driver's name and provides the corresponding points scored in a year.
It also uses matplotlib to graph this data.
    Parameters:
    dataset (pd.DataFrame): A multiindexed DataFrame containing Formula 1 race results.

    Returns:
    None, but prints total points for the specified driver in each year and displays a plot of points over the years.
"""
def get_driver_stats(dataset):
    driver_name = input("Enter driver name (e.g Alexander Albon): ")
    # Checks if the driver input exists in the 'Driver' column in the dataset.
    if driver_name not in dataset.index.get_level_values('Driver'):
        print("This driver does not exist in the dataset.")
    # If the driver name exists in the dataset, then it prints the total points for each year.
    else:
        driver_data = dataset.loc[dataset.index.get_level_values('Driver') == driver_name]
        for year in driver_data.index.get_level_values('Year').unique():
            year_data = driver_data.loc[driver_data.index.get_level_values('Year') == year]
            total_points = year_data['Points'].sum()
            print(f"Total points for {driver_name} in {year}: {total_points}")

        # Group the dataset by 'Year' and 'Driver' and calculate the total points.
        driver_points = dataset.groupby(['Year', 'Driver'])['Points'].sum().reset_index()

        # Create a separate plot for each driver.
        drivers = driver_points['Driver'].unique()
        driver_data = driver_points[driver_points['Driver'] == driver_name]
        plt.plot(driver_data['Year'], driver_data['Points'], marker='o', label=driver_name)
        plt.gca().get_xaxis().set_major_locator(plt.MaxNLocator(integer=True))

        # Set plot title, labels, and legend.
        plt.title('Driver Points Over the Years')
        plt.xlabel('Year')
        plt.ylabel('Points')
        plt.legend()

        # Display the plot.
        plt.show()

"""
This function prompts the user for a driver name and prints the corresponding rating if it exists in the merged dataset.
    Parameters:
    ratings_dataset (pd.DataFrame): A DataFrame containing driver ratings.

    Returns:
    None, but prints driver ratings for all years if the driver exists in the dataset.
"""
def get_driver_rating(ratings_dataset):
    driver_name = input("Enter driver name (e.g Alexander Albon): ")
    driver_ratings = ratings_dataset.loc[ratings_dataset['Driver'] == driver_name, ['Year', 'Driver', 'Rating']].drop_duplicates(subset=['Year', 'Driver', 'Rating']).reset_index(drop=True)
    if driver_ratings.empty:
        print("No ratings found for this driver.")
    else:
        print(f"Ratings for {driver_name} in all years:")
        print(driver_ratings.to_string(index=False))

"""
This function uses the describe() method to print aggregated statistics.
    Parameters:
    None

    Returns:
    None, but prints the statistical summary of the dataset.
"""
def general_stats_one():
    dataset_describe = dataset.describe()
    print(dataset_describe)

"""
This function groups the dataset by Team and Year and prints the total points scored by the team in that year.
    Parameters:
    None

    Returns:
    None, but prints the grouped data.
"""
def general_stats_two():
    dataset_pt = dataset.groupby(['Team', 'Year'])['Points'].sum().reset_index(name='Team Points')
    print(dataset_pt)

"""
This is the main function where the program starts execution. It provides various data manipulation and
statistical analysis options for the user.
"""
def main():
    
    # The outer loop will continue until the user provides a valid choice to terminate the program.
    while True:
        print("Press 1 for team stats, 2 for driver stats, 3 for driver ratings, 4 for general stats, 5 to export the dataset as a csv file, or 0 to terminate the program.")
        
        # This inner loop checks the user's initial input. If the input is valid, the program proceeds. 
        # If not, it raises a ValueError and prompts the user again.
        while True:
            try:
                # Attempt to take an integer input from the user. 
                choice = int(input("Enter your choice: "))
                # If the input is a valid integer, break the loop and proceed.
                break  
            except ValueError:
                # If the input cannot be converted to an integer, show an error message.
                print("Invalid entry. Please enter a number.")

        # This control block executes different functions based on the user's choice.
        if choice == 1:
            # If user chooses 1, invoke the function to get team statistics.
            get_team_stats(dataset)

        elif choice == 2:
            # If user chooses 2, invoke the function to get driver statistics.
            get_driver_stats(dataset)

        elif choice == 3:
            # If user chooses 3, invoke the function to get driver ratings.
            get_driver_rating(ratings_dataset)

        elif choice == 4:
            # If user chooses 4, provide another choice to display either a summary of all statistics or a pivot table.
            general_stats_input = (input("Please enter 1 for a summary of all stats, or 2 for a pivot table of all teams and respective points: "))
            if general_stats_input == "1":
                # If the user inputs 1, display a summary of all statistics.
                general_stats_one()
            elif general_stats_input == "2":
                # If the user inputs 2, display a pivot table of all teams and their points.
                general_stats_two()
            else:
                # If the user inputs anything other than 1 or 2, show an error message.
                print("Enter a valid number.")

        elif choice == 5:
            # If user chooses 5, export the dataset to a CSV file and terminate the program.
            dataset.to_csv('F1_Summary.csv')
            break

        elif choice == 0:
            # If user chooses 0, terminate the program without performing any operation.
            break

        else:
            # If the user inputs anything other than 1, 2, 3, 4, 5, or 0, show an error message.
            print("Invalid entry. Please enter 1, 2, 3, 4, 5, or 0.")


main()