from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib import admin
from django.contrib.auth.models import User
from django.conf import settings

class Aircraft(models.Model):

    class AircraftStatus(models.TextChoices):
        AVAILABLE = "AVL", _('Available')
        RESERVED = "RES", _('Reserved')
        MAINTENANCE = "MTN", _('Maintenance')
        UNAVAILABLE = "UNV", _('Unavailable')                        
    company = models.CharField(max_length=50)
    type = models.CharField(max_length=100)

    capacity = models.PositiveSmallIntegerField() # eg. 500
    seat_rows = models.PositiveSmallIntegerField() # eg. 34
    seat_columns = models.CharField(max_length=10) # eg. 3-4-3, 3-3, 2-4-2, etc

    status = models.CharField(max_length=3, choices=AircraftStatus.choices, default=AircraftStatus.AVAILABLE)
    fuel_per_km = models.DecimalField(max_digits=4, decimal_places=2) # will dictate base cost of flight (fuel/km * km / #seats) 

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    

    def __str__(self):
        return str(self.pk) + "-" + self.company + " " + self.type 

class AircraftAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at','updated_at',)

class Seat(models.Model):
    class SeatType(models.TextChoices):
        ORDINARY = "ORD", _('Ordinary')
        COMFORT = "CMF", _('Comfort')
        BUSINESS = "BUS", _('Business')   

    type = models.CharField(max_length=3, choices=SeatType.choices, default=SeatType.ORDINARY)
    amount = models.DecimalField(max_digits=5, decimal_places=2) # eg. $999.99
    multiplier = models.DecimalField(max_digits=3, decimal_places=2) # eg. 1x for ordinary, 1.4x for comfort, 2x for business
    row_position = models.PositiveSmallIntegerField()
    column_position = models.PositiveSmallIntegerField()    

    aircraft_ref = models.ForeignKey(Aircraft, null=False, blank=False, on_delete=models.CASCADE)    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return str(self.pk) + "-" + self.aircraft_ref.type + " " + self.type + " [" + str(self.column_position) + "," + str(self.row_position) + "]"    

class SeatAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at','updated_at',)

class Destination(models.Model):
    name = models.CharField(max_length=200)
    airport_code = models.CharField(max_length=3)
    latitude = models.DecimalField(max_digits=10, decimal_places=7) # eg. +/- 123.4567
    longitude = models.DecimalField(max_digits=10, decimal_places=7) # eg. +/- 123.4567

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)      

    def __str__(self):
        return self.name + ", (" + self.airport_code + ")"

class DestinationAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at','updated_at',)

class Crew(models.Model): 
    class CrewStatus(models.TextChoices):
        AVAILABLE = "AVL", _('Available')
        REGISTERED = "REG", _('Registered')
        UNAVAILABLE = "UNV", _('Unavailable')                   

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    status = models.CharField(max_length=3, choices=CrewStatus.choices, default=CrewStatus.AVAILABLE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return self.first_name + " " + self.last_name

class CrewAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at','updated_at',)


class Flight(models.Model): # Todo
    date = models.DateField()
    departure_time = models.DateTimeField(auto_now_add=False, blank=False)
    arrival_time = models.DateTimeField(auto_now_add=False, blank=False)
    start_point = models.ForeignKey(Destination, null=True, blank= True, on_delete=models.DO_NOTHING, related_name="origin")
    end_point = models.ForeignKey(Destination, null=True, blank= True, on_delete=models.DO_NOTHING, related_name="destination")
    distance = models.FloatField()
    est_duration = models.TimeField(auto_now_add=False)
    
    aircraft_ref = models.ForeignKey(Aircraft, null=True, blank= True, on_delete=models.DO_NOTHING)
    crews_ref = models.ManyToManyField('Crew', through='FlightCrew')
    # seats_ref = models.ForeignKey(Aircraft, null=True, blank=False, on_delete=models.DO_NOTHING)
    # passengers_ref = models.ForeignKey(Aircraft, null=True, blank=False, on_delete=models.DO_NOTHING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return str(self.date) + "-" + self.start_point.name + "-" + self.end_point.name + " " + str(self.departure_time) + " (" + str(self.id) + ")";

class FlightAdmin(admin.ModelAdmin):
    readonly_fields = ('date','departure_time','est_duration','arrival_time', 'created_at','updated_at',)




# class Transaction(models.Model):
#     amount = models.DecimalField(max_digits=7, decimal_places=2) # eg. $12,345.67
#     user_ref = models.ForeignKey() #TODO
#     flight_ref = models.ForeignKey() #TODO
#     seat_ref = models.ForeignKey() # TODO

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)       
    
class Passenger(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    flight_id = models.ForeignKey(Flight, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return str(self.flight_id.id) + "-" + str(self.first_name) + str(self.last_name)
        
class PassengerAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at','updated_at',)

class Ticket(models.Model):
    flight_ref = models.ForeignKey(Flight, null=True, blank= True, on_delete=models.DO_NOTHING)
    seat_ref = models.ForeignKey(Seat, null=True, blank= True, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return str(self.id) + "-" + str(self.flight_ref.id) + "-" + str(self.seat_ref.id) + " " + str(self.name)
    
class TicketAdmin(admin.ModelAdmin):
    readonly_fields = ('flight_ref', 'seat_ref', 'created_at','updated_at',)            


class Promotion(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, blank=False, null=True)
    code = models.CharField(max_length=20)
    discount_percentage = models.DecimalField(max_digits=3, decimal_places=2, default=1.00)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return self.code

class PromotionAdmin(admin.ModelAdmin):
    readonly_fields = ('user', 'created_at','updated_at',)    

# Junction Tables
class FlightCrew(models.Model):
    flight_id = models.ForeignKey(Flight, on_delete=models.CASCADE)
    crew_id = models.ForeignKey(Crew, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return str(self.flight_id.id) + "-" + str(self.crew_id.id)    