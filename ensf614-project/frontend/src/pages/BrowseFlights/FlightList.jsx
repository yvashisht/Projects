import { Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useContext } from 'react';

// My Context
import { Context } from '../Landing/Landing';
import FlightCard from './FlightCard';
import SeatCard from './SeatCard';

const FlightList = (props) => {
	const [fromObj, setFromObj, toObj, setToObj, flightList, setFlightList] =
		useContext(Context);

	const displayFlights = flightList.map((flight, index) => {
		return (
				<Grid
					container
					sx={{ width: '100%', }}
					direction="row"
					spacing={1}
					key={flight.id}
				>
					<Grid
						container
						item
						xs={1}
					/>
					{/* Flight Card */}
					<Grid
						container
						item
						xs={7}
					>
						<FlightCard
							flight={flight}
							key={flight.id}
						/>
					</Grid>

					{/* Seat Selection */}
					<Grid
						container
						item
						xs={3}
					>
						<SeatCard
							flight={flight}
							key={flight.id}
						/>
					</Grid>
					<Grid
						container
						item
						xs={1}
					/>
				</Grid>
		);
	});

	// Once Active!
	if (props.toggle) {
		return (
			<Paper
				sx={{
					top: '99vh',
					position: 'relative',
					width: '100%',

				}}
			>
				<Typography sx={{paddingTop: "2%", paddingBottom: "1%",display: "flex", justifyContent: "center"}} variant='h3'>Select Flight</Typography>
				<Stack
					direction="column"
					spacing={0.5}
					sx={{paddingBottom: "5%"}}
				>
					{displayFlights}
				</Stack>
			</Paper>
		);
	}

	return <></>;
};

export default FlightList;
