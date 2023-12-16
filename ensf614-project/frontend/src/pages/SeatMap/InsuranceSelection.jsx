//-------------------------------------------------------//
//  File Name: InsuranceSelection.jsx
//  Description: Insurance Selection for Seat
//
//  Requirements:
//      - SeatSelectionForm.jsx
//
//  Renders:
//      - Seat Selection Insurance Details
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import React from 'react';
import TitleLineItem from './TitleLineItem';

//  MAIN FUNCTION
//-------------------------------------------------------//
const InsuranceSelection = (props) => {
	const handleChange = (event) => {
		props.setInsurance(event.target.checked);
	};
	return (
		<Paper
			elevation={4}
			sx={{background: "#161616", borderRadius: "15px"}}
		>
			<Grid
				container
				direction="column"
			>
				<TitleLineItem title="FLIGHT INSURANCE" />

				<Grid
					container
					item
					xs={9}
					sx={{paddingTop: "8px", marginBottom: "12px"}}
				>
					<FormGroup sx={{ paddingLeft: '16px' }}>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleChange}
									checked={props.insurance}
								/>
							}
							label="Flight Insurance"
						/>
					</FormGroup>
				</Grid>
			</Grid>
		</Paper>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default InsuranceSelection;
