import { Box, Button } from '@mui/material';
import React from 'react';

const TestButton = (props) => {

    const handleClick = () => {
        console.log("setting true")
        props.setToggle(true)
    }


	return (
		<Box>
			<Button
				variant="outlined"
				color="primary"
				fullWidth
                onClick={() => handleClick()}
			>
				Toggle
			</Button>
		</Box>
	);
};

export default TestButton;
