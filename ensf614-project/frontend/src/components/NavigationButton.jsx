//-------------------------------------------------------//
//  File Name: NavBar.jsx
//  Description: Responsive Navigation Bar for Landing Page
//
//  Requirements:
//      - Landing.jsx
//
//  Renders:
//      - Navigation Bar
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//
// React Import
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

//  MAIN FUNCTION
//-------------------------------------------------------//

const NavigationButton = (props) => {
	return (
		<>
			<Button
				variant="contained"
				color={props.color}
				size={props.size || "small"}
				sx={{ marginRight: "16px" }}
			>
				<Link to={props.path} style={{ textDecoration: "none" }}>
					<Typography variant='landing_button'>{props.label}</Typography>
				</Link>
			</Button>
		</>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default NavigationButton;
