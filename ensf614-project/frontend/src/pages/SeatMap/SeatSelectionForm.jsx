//-------------------------------------------------------//
//  File Name: SeatSelectionForm.jsx
//  Description: UserForm for Seat Selection
//
//  Requirements:
//      - SeatSelection.jsx
//
//  Renders:
//      - Seat Selection User Form
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Imports
import React, { useState } from 'react';

// MUI Imports
import { Box, Button, Stack, Typography } from '@mui/material';

// My Component
import SummaryFlightDetails from './SummaryFlightDetails';
import SummarySeatDetails from './SummarySeatDetails';
import InsuranceSelection from './InsuranceSelection';
import SummarySubtotal from './SummarySubtotal';
import PromotionSelection from './PromotionSelection';

//  STYLES
//-------------------------------------------------------//
const BoxSX = {
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'flex-start',
};

//  MAIN FUNCTION
//-------------------------------------------------------//
const SeatSelectionForm = (props) => {
	const [insurance, setInsurance] = useState(false);

	const [discount, setDiscount] = useState(false);
	const [discountAmount, setDiscountAmount] = useState(0);

	// Once Active!
	if (props.selectedSeat !== undefined) {
		return (
			<Box sx={BoxSX}>
				<Stack
					direction="column"
					spacing={1}
					sx={{ paddingTop: '16px' }}
				>
					<SummaryFlightDetails flight={props.flight} />
					<SummarySeatDetails seat={props.selectedSeat} />
					<InsuranceSelection
						setInsurance={setInsurance}
						insurance={insurance}
					/>
					<PromotionSelection
						setDiscount={setDiscount}
						setDiscountAmount={setDiscountAmount}
					/>
					<SummarySubtotal
						flight={props.flight}
						seat={props.selectedSeat}
						insurance={insurance}
						discount={discount}
						discountAmount={discountAmount}
					/>
				</Stack>
			</Box>
		);
	}

	return (
		<Box sx={BoxSX}>
			<Typography
				variant="h3"
				sx={{ paddingTop: '16px', textAlign: 'center' }}
			>
				Select a Seat
			</Typography>
		</Box>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default SeatSelectionForm;

// Form Should be Broken Out into Multiple Sections
// --> Summarize Flight Details
//		Flight ID
//		Departure Date & Time
//		Duration
//		Arrival Date & Time

// --> Summarize Seat Details
//		Seat Type
//		Row & Column
//

// --> Seat Insurance Selection
//		Select Insurance

// --> Subtotal
//		Subtotal
//		Insurance
//		Tax
//		Confirmation Button

// ONCE CLICKED, Redirect to Payment Form (to collect more info for ticket)
// Pass as prop the subtotal to payment for processing

// Should TICKETS have a refeerence to both a seat and a flight? Seat map should really populate available SEATS from TICKETS
// TICKETS can be
