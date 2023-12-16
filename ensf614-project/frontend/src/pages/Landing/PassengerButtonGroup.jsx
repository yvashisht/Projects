//-------------------------------------------------------//
//  File Name: PassengerButtonGroup.jsx
//  Description: ButtonGroup Component for Passenger Count

//  Requirements:
//      - FlightSelectionForm.jsx
//
//  Renders:
//      - PassengerButtonGroup.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';

// MUI Imports
import { Button, ButtonGroup, Typography, Stack } from '@mui/material';

//  MAIN FUNCTION
//-------------------------------------------------------//

const PassengerButtonGroup = (props) => {
	const handleIncrement = () => {
		var count = props.passenegers + 1;
		props.setPassengers(count);
	};

	const handleDecrement = () => {
		var count = props.passenegers - 1;
		if (count == 0) count = 1;
		props.setPassengers(count);
	};
	return (
		<Stack direction="row">
			<Typography
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				Number of Passengers:
			</Typography>
			<ButtonGroup sx={{ paddingLeft: '16px' }}>
				<Button
					onClick={handleDecrement}
					disabled={props.passenegers == 1 ? true : false}
				>
					-
				</Button>
				<Button disabled>{props.passenegers}</Button>
				<Button onClick={handleIncrement}>+</Button>
			</ButtonGroup>
		</Stack>
	);
};

//  EXPORTS
//-------------------------------------------------------//

export default PassengerButtonGroup;
