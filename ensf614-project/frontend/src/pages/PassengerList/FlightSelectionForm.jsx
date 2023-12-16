//-------------------------------------------------------//
//  File Name: FlightSelectionForm.jsx
//  Description: User Form to Obtain Selected Flight ID
//
//  Requirements:
//      - PassengerListView.jsx
//
//  Renders:
//      - User Form to Obtain Selected FlightID
//
// Created By: Corey Yang-Smith
// Date: November 29th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Imports
import React from 'react';

// MUI Imports
import { Button, Stack, TextField, Typography } from '@mui/material';

//  MAIN FUNCTION
//-------------------------------------------------------//
const FlightSelectionForm = (props) => {
	const handleChange = (event) => {
		props.setSelectedFlight(event.target.value);
	};

	return (
		<Stack
			direction="column"
			spacing={1}
		>
			<Typography>Enter Flight ID</Typography>

			<TextField
				value={props.selectedFlight}
				onChange={(e) => handleChange(e)}
				required
			/>
		</Stack>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default FlightSelectionForm;
