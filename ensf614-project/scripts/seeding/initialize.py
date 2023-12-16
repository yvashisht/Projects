from django.contrib.auth.models import User

def run():
    # Generate Default Admin User
    admin_user = "admin"
    admin_password = "pass"

    admin_user = User.objects.get_or_create(username = admin_user,
                                is_staff=True,
                                is_superuser=True)[0]
    admin_user.set_password(admin_password)
    admin_user.save()

    print("Default Admin user successfully generated")