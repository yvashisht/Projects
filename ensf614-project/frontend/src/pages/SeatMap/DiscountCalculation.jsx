//-------------------------------------------------------//
//  File Name: DiscountCalculation.jsx
//  Description: Formatting for individual line item in subtotal
//
//  Requirements:
//      - SummarySubtotal.jsx
//
//  Props:
//      - flight (Flight): Selected Flight
//      - seat (Seat): Selected Seat
//      - insurance (boolean): boolean
//
//  Renders:
//      - Subtotal Calculation and Display
//
// Created By: Corey Yang-Smith
// Date: November 25th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Grid, Typography } from '@mui/material';
import React from 'react';

// MUI Import

//  MAIN FUNCTION
//-------------------------------------------------------//
const DiscountCalculation = (props) => {

    function convertToPercentage(percentage) {
		var value = percentage * 100
		value = value.toString() + "%"
		return value
    }

	return (
		<Grid
			container
			direction="row"
		>
			<Grid xs={6}>
				<Typography>Discounted %</Typography>
			</Grid>

			<Grid xs={6}>
				<Typography sx={{justifyContent: 'flex-end', display: 'flex'}}>{convertToPercentage(props.discountAmount)}</Typography>
			</Grid>                                    
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default DiscountCalculation;
