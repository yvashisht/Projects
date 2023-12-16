//-------------------------------------------------------//
//  File Name: DiscountTotalCalculation.jsx
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
//      - Final Calculation and Display
//
// Created By: Corey Yang-Smith
// Date: December 1st, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Grid, Typography } from '@mui/material';
import React from 'react';

// MUI Import

//  MAIN FUNCTION
//-------------------------------------------------------//
const DiscountTotalCalculation = (props) => {

    function calculateNewSubtotal(percentage, oldSubtotal) {
		var newSubtotal = parseFloat(oldSubtotal - (oldSubtotal * percentage)).toFixed(2)
		props.setDiscountedTotal(newSubtotal)
		return newSubtotal
    }

	return (
		<Grid
			container
			direction="row"
		>
			<Grid xs={6}>
				<Typography>New Subtotal</Typography>
			</Grid>

			<Grid xs={6}>
				<Typography sx={{justifyContent: 'flex-end', display: 'flex'}}>${calculateNewSubtotal(props.discountAmount, props.subtotal)}</Typography>
			</Grid>                                    
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default DiscountTotalCalculation;
