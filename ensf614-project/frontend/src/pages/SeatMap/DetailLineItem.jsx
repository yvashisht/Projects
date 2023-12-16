//-------------------------------------------------------//
//  File Name: DetailLineItem.jsx
//  Description: Detailed Information for Each Line Item, With Formatting
//
//  Requirements:
//      - SeatSelection.jsx
//
//  Renders:
//      - Renders Line in Correct Formatting
//
// Created By: Corey Yang-Smith
// Date: November 27th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Stack, Typography } from '@mui/material';
import React from 'react';

//  MAIN FUNCTION
//-------------------------------------------------------//
const DetailLineItem = (props) => {
	return (
		<Stack
			direction="row"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				paddingLeft: '16px',
				paddingRight: '16px',
				paddingTop: '4px',
				paddingBottom: '4px',
			}}
		>
			<Typography variant="body1">{props.description}</Typography>

			<Typography variant="body2">{props.value}</Typography>
		</Stack>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default DetailLineItem;
