//-------------------------------------------------------//
//  File Name: DestinationArrivalForm.jsx
//  Description: Arrival/Destination and Calendar Entry for Flight Search
//
//  Requirements:
//      - FlightSelectionForm.jsx
//
//  Renders:
//      - DestinationArrivalForm.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';

// MUI Import
import { Stack } from '@mui/material';
import DestinationSelectionDropdown from './DestinationSelectionDropdown';
import DestinationCalendar from './DestinationCalendar';

//  MAIN FUNCTION
//-------------------------------------------------------//
const DestinationArrivalForm = (props) => {
	return (
		<Stack direction="row">
			<DestinationSelectionDropdown
				data={props.data}
				selectedItem={props.selectedHome}
				setSelectedItem={props.setSelectedHome}
				where={props.where}
				setObj={props.setObj}
			/>
			<DestinationCalendar
				depLabel={props.depLabel}
				selectedTrip={props.selectedTrip}
				date={props.date}
				setDate={props.setDate}
			/>
		</Stack>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default DestinationArrivalForm;
