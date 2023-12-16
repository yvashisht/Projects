//-------------------------------------------------------//
//  File Name: SubtotalCalculation.jsx
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
const SubtotalCalculation = (props) => {

    function getSubtotal() {
        var subtotal = parseFloat(props.flightCost) + parseFloat(props.seatCost)
		if (props.insurance) subtotal += 50
		subtotal = parseFloat(subtotal).toFixed(2)
        props.setSubtotal(subtotal)
		return subtotal
    }

	return (
		<Grid
			container
			direction="row"
		>
			<Grid xs={6}>
				<Typography>Subtotal</Typography>
			</Grid>

			<Grid xs={6}>
				<Typography sx={{justifyContent: 'flex-end', display: 'flex'}}>${getSubtotal()}</Typography>
			</Grid>                                    
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default SubtotalCalculation;
