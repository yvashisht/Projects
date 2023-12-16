//-------------------------------------------------------//
//  File Name: AdminView.jsx
//  Description: Main Component for Admin View
//
//  Requirements:
//      - App.jsx
//
//  Renders:
//      - Admin Page
//
// Created By: Corey Yang-Smith
// Date: November 29th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Imports
import React from 'react';

// MUI Imports
import { Button, Grid, Stack, Typography } from '@mui/material';

// React Router Dom
import { Link } from 'react-router-dom';
import ViewFlightsByDate from './ViewFlightsByDate';
import ViewCrewsByFlight from './ViewCrewsByFlight';

//  MAIN FUNCTION
//-------------------------------------------------------//
const AdminView = () => {
	return (
		// Browse Flights by DATE
		// List Crews by Flight
		// Print Registered Users
		<Grid
			container
			direction="row"
			sx={{ background: '#121212' }}
			spacing={2}
		>
			<Grid
				container
				item
				xs={1}
				sx={{ paddingLeft: '16px', paddingTop: '16px' }}
			>
				<Stack
					direction="column"
					spacing={2}
					sx={{ paddingLeft: '16px', paddingTop: '16px' }}
				>
					<Button
						variant="outlined"
						sx={{ height: '50px' }}
					>
						<Link
							to="/"
							style={{ textDecoration: 'none' }}
						>
							<Typography color="primary">Return</Typography>
						</Link>
					</Button>
					<Button
						variant="outlined"
						sx={{ height: '50px' }}
					>
						<Link
							to="http://127.0.0.1:8000/admin/"
							style={{ textDecoration: 'none' }}
						>
							<Typography color="primary">Admin Panel</Typography>
						</Link>
					</Button>
				</Stack>
			</Grid>

			<Grid
				container
				item
				xs={8}
				sx={{ width: "100%"}}
			>
				<ViewFlightsByDate />
			</Grid>

			<Grid
				container
				item
				xs={3}
			>
				<ViewCrewsByFlight />
			</Grid>
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default AdminView;
