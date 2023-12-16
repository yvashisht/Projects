from django.contrib import admin

from .models import *

# Main Tables
admin.site.register(Aircraft, AircraftAdmin)
admin.site.register(Seat, SeatAdmin)
admin.site.register(Destination, DestinationAdmin)
admin.site.register(Crew, CrewAdmin)
admin.site.register(Flight, FlightAdmin)
admin.site.register(Passenger, PassengerAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(Promotion, PromotionAdmin)

# Junction Tables
admin.site.register(FlightCrew)