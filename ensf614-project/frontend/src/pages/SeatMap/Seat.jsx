//-------------------------------------------------------//
//  File Name: Seat.jsx
//  Description: Single Seat component for Flight SeatMap
//
//  Requirements:
//      - TODO.jsx
//
//  Renders:
//      - Single seat object
//
// Created By: Corey Yang-Smith
// Date: November 13th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

// React Router Dom
import { useLocation } from 'react-router-dom';

import { getSeatCost, getSeatName } from "../../utils/SeatUtilities.js"

//  MAIN FUNCTION
//-------------------------------------------------------//

const Seat = (props) => {
	let { state } = useLocation();

	function handleChange() {
		props.setSelectedSeat(props.seat);
	}
	if (props.seat.available) {
		return (
			<Button
				size="small"
				sx={{ width: '60px', height: '60px', background: '#045200' }}
				onClick={(e) => handleChange()}
			>
				<Stack direction="column">
					<Typography sx={{ fontSize: 10 }}>
						{getSeatName(props.seat)}
					</Typography>
					<Typography sx={{ fontSize: 10 }}>{props.seat.type}</Typography>
					<Typography sx={{ fontSize: 10 }}>
						{getSeatCost(props.seat)}
					</Typography>
				</Stack>
			</Button>
		);
	} else {
		return (
			<Button
				sx={{ width: '60px', height: '60px', background: '#240000' }}
				disabled
			>
				X
			</Button>
		);
	}
};

//  EXPORTS
//-------------------------------------------------------//
export default Seat;
