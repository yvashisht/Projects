//-------------------------------------------------------//
//  File Name: SubtotalLineItemNoQuantity.jsx
//  Description: Formatting for individual line item in subtotal
//
//  Requirements:
//      - SummarySubtotal.jsx
//
//  Props:
//      - name (String): Item Name to Display
//      - amount (float): Base Amount
//      - quantity (int): Quantity
//
//  Renders:
//      - Individual Line item
//
// Created By: Corey Yang-Smith
// Date: November 25th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';

// MUI Import
import { Grid, Typography } from '@mui/material';

//  MAIN FUNCTION
//-------------------------------------------------------//
const TaxCalculation = (props) => {

    function getTax() {
        var tax = (props.subtotal * 0.05).toFixed(2);

		if (props.discount) {
			var total = (parseFloat(props.discountedTotal) + parseFloat(tax)).toFixed(2)
			props.setTotal(total)

		}
		else {
			var total = (parseFloat(props.subtotal) + parseFloat(tax)).toFixed(2)
			props.setTotal(total)
		}
        return tax
    }

	return (
		<Grid
			container
			direction="row"
		>
			<Grid xs={6}>
				<Typography>Tax (5%)</Typography>
			</Grid>

			<Grid xs={6}>
				<Typography sx={{justifyContent: 'flex-end', display: 'flex'}}>${getTax()}</Typography>
			</Grid>                                    
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default TaxCalculation;
