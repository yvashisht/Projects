//-------------------------------------------------------//
//  File Name: FlightSelectionMain.jsx
//  Description: Main Components for Flight Selection
//
//  Requirements:
//      - Landing.jsx
//
//  Renders:
//      - FlightSelectionMain.jsx and all sub components
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';

// MUI Import
import { Paper, Typography, Stack } from '@mui/material';

// My Component Imports
import FlightSelectionForm from './FlightSelectionForm';

//  STYLES
//-------------------------------------------------------//
const frostedGlassSX = {
	background: 'rgba(255,255,255,.25)',
	backdropFilter: 'blur(10px)',
	display: 'flex',
	padding: '16px',
	zIndex: '-100',
	maxWidth: "500px",
	marginLeft: '15vw',
	marginTop: '25vh',
};

//  MAIN FUNCTION
//-------------------------------------------------------//

const FlightSelectionMain = (props) => {

	// Once Active
	if(props.toggle) {
		return(<></>)
	}
	

	return (
		<Paper sx={frostedGlassSX}>
			<Stack
				direction="column"
				spacing={3}
			>
				<Typography>Select Flight Information</Typography>
				<FlightSelectionForm
					destinations={props.destinations}
					setToggle={props.setToggle}
				/>

			</Stack>
		</Paper>
	);
};

//  EXPORTS
//-------------------------------------------------------//

export default FlightSelectionMain;
