//-------------------------------------------------------//
//  File Name: SeatSelectionRadio.jsx
//  Description: Seat Selection Dropdown Menu
//
//  Requirements:
//      - FlightSelectionForm.jsx
//
//  Renders:
//      - SeatSelectionRadio.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import React from 'react';

//  MAIN FUNCTION
//-------------------------------------------------------//
const SeatSelectionRadio = (props) => {
	const handleChange = (value) => {
		props.setSeatSelection(value);
	};

	return (
		<FormControl>
			<FormLabel id="demo-controlled-radio-buttons-group">Seat Type</FormLabel>
			<RadioGroup
				aria-labelledby="demo-controlled-radio-buttons-group"
				name="controlled-radio-buttons-group"
				value={props.seatSelection}
				onChange={(e) => handleChange(e.target.value)}
				row
			>
				<FormControlLabel
					value="ORD"
					control={<Radio />}
					label="Ordinary"
				/>
				<FormControlLabel
					value="CMF"
					control={<Radio />}
					label="Comfort"
				/>
				<FormControlLabel
					value="BUS"
					control={<Radio />}
					label="Business"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default SeatSelectionRadio;
