//-------------------------------------------------------//
//  File Name: DestinationCalendar.jsx
//  Description: Destination Calendar for Selecting Flight Dates
//
//  Requirements:
//      - DestinationArrivalForm.jsx
//
//  Renders:
//      - DestinationCalendar.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// Day JS
import dayjs from 'dayjs';

// MUI Import
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// React Import
import React from 'react';

//  MAIN FUNCTION
//-------------------------------------------------------//
const DestinationCalendar = (props) => {
	if (props.selectedTrip == 'OneWay' && props.depLabel == 'Arrival Date')
		return <></>;

	const handleChange = (el) => {
		console.log(el);
		props.setDate(dayjs(el.$d).format("YYYY-MM-DD"));

	};


	// TODO create Controlled component..?
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				value={props.date}
				onChange={(e) => {handleChange(e)}}
				label={props.depLabel}
			></DatePicker>
		</LocalizationProvider>
	);
};

//  EXPORTS
//-------------------------------------------------------//

export default DestinationCalendar;
