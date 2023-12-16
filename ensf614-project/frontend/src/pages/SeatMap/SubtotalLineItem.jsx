//-------------------------------------------------------//
//  File Name: SubtotalLineItem.jsx
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
//      - Individual Line Item
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Grid, Typography } from '@mui/material';
import React from 'react';

// MUI Import

//  MAIN FUNCTION
//-------------------------------------------------------//
const SubtotalLineItem = (props) => {

    const typeStyle = {
        justifyContent:'flex-end', 
        display:'flex'
    }

    function getTotal(amount, quantity) {
        var total = (amount * quantity).toFixed(2);
        return total
    }

	return (
		<Grid
			container
			direction="row"
			sx={{marginTop: "4px"}}
		>
			<Grid xs={3}>
				<Typography>{props.name}</Typography>
			</Grid>
			<Grid xs={3}>
				<Typography sx={{justifyContent: 'flex-end', display: 'flex'}}>${parseFloat(props.amount).toFixed(2)}</Typography>
			</Grid>
			<Grid xs={3}>
				<Typography sx={{justifyContent: 'center', display: 'flex'}}>{props.quantity}x</Typography>
			</Grid>
			<Grid xs={3}>
				<Typography sx={{justifyContent: 'flex-end', display: 'flex'}}>${getTotal(props.amount, props.quantity)}</Typography>
			</Grid>                                    
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default SubtotalLineItem;
