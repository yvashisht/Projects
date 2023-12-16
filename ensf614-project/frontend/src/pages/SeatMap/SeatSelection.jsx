//-------------------------------------------------------//
//  File Name: SeatSelection.jsx
//  Description: Main Component for Seat Selection
//
//  Requirements:
//      - App.jsx
//
//  Renders:
//      - Seat Selection Main Component
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useState } from 'react';

// MUI Imports
import { Button, Grid, Typography } from '@mui/material';

// My Components
import FlightDeck from './FlightDeck';
import SeatSelectionForm from './SeatSelectionForm';

// React Router Dom Import
import { Link, useLocation } from 'react-router-dom';

//  MAIN FUNCTION
//-------------------------------------------------------//
const SeatSelection = (props) => {
	const [selectedSeat, setSelectedSeat] = useState();
	let { state } = useLocation();

	return (
		<Grid
			container
			direction="row"
			sx={{ background: '#121212', padding: '2%' }}
		>
			<Grid
				container
				item
				xs={1}
			>
				<Button
					variant="outlined"
					sx={{ height: '50px' }}
				>
					<Link
						to="/"
						style={{ textDecoration: 'none' }}
					>
						<Typography color="primary">Return</Typography>
					</Link>
				</Button>
			</Grid>
			<Grid
				container
				item
				xs={7}
				sx={{ direction: 'flex', justifyContent: 'center' }}
			>
				<FlightDeck flight={state.flight} setSelectedSeat={setSelectedSeat}/>
			</Grid>

			<Grid
				container
				item
				xs={3}
				sx={{ direction: 'flex', justifyContent: 'center' }}
			>
				<SeatSelectionForm selectedSeat={selectedSeat} flight={props.flight}/>
			</Grid>

			<Grid
				container
				item
				xs={1}
			/>
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default SeatSelection;
