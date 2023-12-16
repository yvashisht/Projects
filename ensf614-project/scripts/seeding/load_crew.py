#-------------------------------------------------------#
#   File Name: scripts/load_crew.py
#   Description: Seeding script to randomly generate crew member data.
#
#   Requirements:
#       - config.py - CREW_NUMBER
#
#   Returns:
#       - Calls related functions to populate db with data
#
#   Created By: Corey Yang-Smith
#   Date: November 11th, 2023
#-------------------------------------------------------#


#   IMPORTS
#-------------------------------------------------------#
import random
from faker import Faker
from scripts.seeding.config import CREW_NUMBER
from main.models import Crew


#   MAIN FUNCTION
#-------------------------------------------------------#

def get_random_status():
    '''
    get_random_status

    Args:
        None

    Returns:
        Randomly selected Status from CREW_STATUS
    '''
    return random.choice(Crew.CrewStatus.choices)[0]


def run():
    # Create instance of Faker class
    faker = Faker()

    # Generate X num of Crew Members
    for i in range(CREW_NUMBER):
        fake_name = faker.name().split()
        fake_first_name = fake_name[0]
        fake_last_name = fake_name[1]
        fake_status = get_random_status()

        crew = Crew.objects.get_or_create(
            first_name=fake_first_name,
            last_name=fake_last_name,
            status=fake_status
        )
    print("'Crew' model successfully generated (",CREW_NUMBER,")")

        
