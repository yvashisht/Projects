import { Box, Button } from '@mui/material';
import React from 'react';

const FlightSelectionButton = (props) => {
	return (
		<Box>
			<Button
				variant="outlined"
				color="primary"
				disabled={props.formFilled.current ? false : true}
				fullWidth
			>
				Find Flights
			</Button>
		</Box>
	);
};

export default FlightSelectionButton;
