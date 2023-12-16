import { useFlights } from '../../hooks/useFlights.js';
import React, { useState, useEffect } from 'react';
import { getPassengersByFlight } from '../../api/posts';

import {
	Container,
	Typography,
	List,
	ListItem,
	ListItemText,
	Paper,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
} from '@mui/material';

const PassengerList = (props) => {
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');


	/**
	 * getSeatName
	 * @param {*} row int: row number
	 * @param {*} col int: column number
	 * @returns 
	 */
	function getSeatName(seat) {
		var seatName = ""
		const col = seat.column_position;
		const row = seat.row_position;

		seatName = (row + 1).toString()
		seatName += String.fromCharCode(97 + col).toUpperCase()

		return seatName
	}	

	useEffect(() => {
		if (props.selectedFlight) {
			setLoading(true);
			getPassengersByFlight(props.selectedFlight)
				.then((data) => {
					setTickets(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error:', error);
					setError('Error fetching passengers');
					setLoading(false);
				});
		} else {
			setTickets([]);
		}
	}, [props.selectedFlight]);

	const displayPassengers = tickets.map((ticket, index) => {
		return (
			<ListItem key={ticket.id}>
				<ListItemText
					primary={`${ticket.name}` + " (" + `${getSeatName(ticket.seat_ref)}`+ ")"}
				/>
			</ListItem>
		);
	});


	return (
		<Container style={{ background: '#000000' }}>
			<Typography
				variant="h4"
				gutterBottom
			>
				Passenger List
			</Typography>

			{loading && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress />
				</div>
			)}
			{error && <Typography color="error">{error}</Typography>}
			{!loading && !error && tickets.length === 0 && (
				<Typography>No passengers found for the selected flight.</Typography>
			)}
			<Paper
				elevation={3}
				style={{ marginTop: 16, marginBottom: 16 }}
			>
				<List>{displayPassengers}</List>
			</Paper>
		</Container>
	);
};

export default PassengerList;
