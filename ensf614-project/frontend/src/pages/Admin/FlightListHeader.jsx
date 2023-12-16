//-------------------------------------------------------//
//  File Name: FlightListHeader.jsx
//  Description: Header Display for Flight Info on Admin Panel
//
//  Requirements:
//      - ViewFlightsdByDate.jsx
//
//  Renders:
//      - Header Information
//
// Created By: Corey Yang-Smith
// Date: November 29th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Grid, Typography } from '@mui/material';
import React from 'react';

const FlightListHeader = () => {
	return (
		<Grid
			direction="row"
			container
			sx={{width: "100%"}}
			spacing={0.5}
		>
			<Grid
				item
				xs={.5}
			>
				<Typography variant="table_heading" sx={{display: 'flex', justifyContent: 'center', borderBottom: "1px solid white"}}>ID</Typography>
			</Grid>

			<Grid
				item
				xs={1.5}
			>
				<Typography variant="table_heading" sx={{display: 'flex', justifyContent: 'center', borderBottom: "1px solid white"}}>Date</Typography>
			</Grid>
			<Grid
				item
				xs={4}
			>
				<Typography variant="table_heading" sx={{display: 'flex', justifyContent: 'flex-start', borderBottom: "1px solid white"}}>Departure</Typography>
			</Grid>

			<Grid
				item
				xs={4}
			>
				<Typography variant="table_heading" sx={{display: 'flex', justifyContent: 'flex-start', borderBottom: "1px solid white"}}>Arrival</Typography>
			</Grid>

			<Grid
				item
				xs={1}
			>
				<Typography variant="table_heading" sx={{display: 'flex', justifyContent: 'center', borderBottom: "1px solid white"}}>Dist. (km)</Typography>
			</Grid>

			<Grid
				item
				xs={1}
			>
				<Typography variant="table_heading" sx={{display: 'flex', justifyContent: 'center', borderBottom: "1px solid white"}}>Est. Dur.</Typography>
			</Grid>
		</Grid>
	);
};

export default FlightListHeader;
