//-------------------------------------------------------//
//  File Name: TitleLineItem,.jsx
//  Description: Detailed Information for Title of Section
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
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

//  MAIN FUNCTION
//-------------------------------------------------------//
const TitleLineItem = (props) => {
	return (
		<Grid
		container
		item
		xs={3}
		sx={{borderBottom: "2px solid orange", paddingBottom: "8px", paddingLeft: "16px", paddingTop: "8px"}}

	>
		
		<Typography variant="body" color="primary" sx={{ display: 'flex', justifyContent: 'center'}}>
			{props.title}
		</Typography>
	</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default TitleLineItem;
