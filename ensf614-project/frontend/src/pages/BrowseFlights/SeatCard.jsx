import { Card, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { useSeatsByAircraft } from '../../hooks/useSeatsByAircraft.js';

import NavigatinButtonFlight from '../../components/NavigationButtonFlight.jsx';
import { useTicketsByFlight } from '../../hooks/useTicketsByFlight.js';

const SeatCard = (props) => {
	const { seatsByAircraft } = useSeatsByAircraft(props.flight.aircraft_ref.id);
	const { ticketsByFlight } = useTicketsByFlight(props.flight.id);
	const totalSeats = useRef(0);
	const [seatsTaken, setSeatsTaken] = useState(0);

	useEffect(() => {
		setSeatsTaken(ticketsByFlight.length);
		totalSeats.current = seatsByAircraft.length;
	}, [ticketsByFlight, seatsByAircraft]);

	return (
		<Card sx={{ width: '100%', background: '#121212', borderRadius: '15px' }}>
			<Stack
				direction="column"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
				spacing={2}
			>
				<Typography>Seats Available</Typography>
				<Typography variant="h4">
					{totalSeats.current - seatsTaken}/{totalSeats.current}
				</Typography>
				<NavigatinButtonFlight
					label="Find Seat"
					path={`/flights/${props.flight.id}`}
					flight={props.flight}
				></NavigatinButtonFlight>
			</Stack>
		</Card>
	);
};

export default SeatCard;
