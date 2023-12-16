//-------------------------------------------------------//
//  File Name: PassengerListView.jsx
//  Description: Main Component for Passenger List
//
//  Requirements:
//      - App.jsx
//
//  Renders:
//      - PassengerListView.jsx and all sub components
//
// Created By: Corey Yang-Smith
// Date: November 29th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useState } from 'react';

// MUI Imports
import { Button, Grid, Typography } from '@mui/material';

// React Router DOM
import { Link } from 'react-router-dom';

// My Components
import PassengerList from './PassengerList';
import FlightSelectionForm from './FlightSelectionForm';

//  MAIN FUNCTION
//-------------------------------------------------------//
const PassengerListView = () => {
	const [selectedFlight, setSelectedFlight] = useState('');

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
				xs={3}
				sx={{ direction: 'flex', justifyContent: 'center' }}
			>
				<FlightSelectionForm setSelectedFlight={setSelectedFlight} selectedFlight={selectedFlight}/>
			</Grid>

			<Grid
				container
				item
				xs={8}
				sx={{ direction: 'flex', justifyContent: 'center' }}
			>
				<PassengerList selectedFlight={selectedFlight} />
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
export default PassengerListView;
