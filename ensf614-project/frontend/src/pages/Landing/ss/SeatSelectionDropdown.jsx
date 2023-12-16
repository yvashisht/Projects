//-------------------------------------------------------//
//  File Name: SeatSelectionDropdown.jsx
//  Description: Seat Selection Dropdown Menu
//
//  Requirements:
//      - FlightSelectionForm.jsx
//
//  Renders:
//      - SeatSelectionDropdown.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useState } from 'react';

// MUI Import
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

//  MAIN FUNCTION
//-------------------------------------------------------//

const SeatSelectionDropdown = (props) => {
	const [options, setOptions] = useState(['Ordinary', 'Comfort Seating', 'Business Class']);

	const handleChange = (item) => {
        console.log(item);
        // props.setSeatSelection(item)
    };

	return (
		<Select
			value={props.seatSelection}
			onChange={(e) => {handleChange(e.target.value)}}>
			<MenuItem value="Oridnary">Oridnary</MenuItem>
			<MenuItem value="Comfort">Comfort Seating</MenuItem>
			<MenuItem value="Business">Business Class</MenuItem>
		</Select>
	);
};
//  EXPORTS
//-------------------------------------------------------//
export default SeatSelectionDropdown;
