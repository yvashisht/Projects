import django
django.setup()

from django.contrib.auth.models import User
from faker import Faker
from scripts.seeding.config import USERS_TO_GENERATE
from main.models import Promotion

'''
load_users.py
Python script that uses fake data to generate a number of fake users.

Args:
    None

Return:
    Populates Django DB 'User' model
'''

def run():
    count = 0

    # Generate Default Admin User
    # Already Generated with Initialization

    # Generate Known (non-admin) User
    test_user = "test"
    test_email = "testuser@ucalgary.ca"
    test_password = "pass"

    test_user = User.objects.get_or_create(username = test_user,
                                            email = test_email,
                                            is_staff=True,
                                            is_superuser=True)[0]
    test_user.set_password(test_password);
    test_user.save()


    test_promo = Promotion.objects.get_or_create(
        user = test_user,
        code = "TEST",
    )



    # Generate Random (blank) Users
    faker = Faker()
    for iter in range(USERS_TO_GENERATE):
        fake_name = faker.name().split()
        fake_first_name = fake_name[0]
        fake_last_name = fake_name[1]
        fake_username = fake_first_name + "-" + fake_last_name
        fake_email = faker.email()

        user = User.objects.get_or_create(username = fake_username,
                                          first_name = fake_first_name,
                                            last_name = fake_last_name,
                                            email = fake_email)[0]
        count += 1
    print("'User' model successfully generated (", count, ")")