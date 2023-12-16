//-------------------------------------------------------//
//  File Name: SummaryFlightDetails.jsx
//  Description: Flight Details Box for Seat Selection Information
//
//  Requirements:
//      - SeatSelectionForm.jsx
//
//  Renders:
//      - Flight Details
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';

// MUI Imports
import { Divider, Grid, Paper, Typography } from '@mui/material';

// React Router Dom
import { useLocation } from 'react-router-dom';

// My Components
import DetailLineItem from './DetailLineItem';
import TitleLineItem from './TitleLineItem';

//  MAIN FUNCTION
//-------------------------------------------------------//
const SummaryFlightDetails = (props) => {
	let { state } = useLocation();

	/**
	 * formatFlightTime: Takes in Django's DateTime String and Converts to Formatted Date and Time
	 * @param {*} datetime
	 * @returns Formatted Date and Time Format
	 */
	function formatFlightTime(datetime) {
		let dtime = new Date(datetime);

		let formattedTime = dtime.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		let formattedDate = dtime.toLocaleDateString('en-US', {
			month: 'long',
			day: '2-digit',
		});
		return formattedDate + ' ' + formattedTime;
	}

	/**
	 * convertDateTimeToDuration: Takes in Django's DateTime String and Converts to Duration XXh XXm Format
	 * @param {str} dateTimeString
	 * @returns Duration Format (str)
	 */
	function convertDateTimeToDuration(TimeString) {
		let hoursString = TimeString.slice(0, 2);
		let minutesString = TimeString.slice(3, 5);
		if (hoursString[0] == '0') hoursString = hoursString[1];
		let finalString = hoursString + 'h ' + minutesString + 'm';

		return finalString;
	}

	return (
		<Paper
			elevation={4}
			sx={{ background: '#161616', borderRadius: '15px' }}
		>
			<Grid
				container
				direction="column"
			>
				<TitleLineItem title="FLIGHT DETAILS" />

				<Grid
					container
					item
					xs={9}
					sx={{ paddingTop: '8px', marginBottom: '12px' }}
				>
					<DetailLineItem
						description="Flight ID"
						value={state.flight.id}
					/>

					<DetailLineItem
						description="Departure"
						value=""
					/>
					<DetailLineItem
						description={state.flight.start_point.airport_code}
						value={formatFlightTime(state.flight.departure_time)}
					/>
					<DetailLineItem
						description="Arrival"
						value=""
					/>
					<DetailLineItem
						description={state.flight.end_point.airport_code}
						value={formatFlightTime(state.flight.arrival_time)}
					/>
					<DetailLineItem
						description="Flight Duration"
						value={convertDateTimeToDuration(state.flight.est_duration)}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default SummaryFlightDetails;
