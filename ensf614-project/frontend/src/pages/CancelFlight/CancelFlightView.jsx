//-------------------------------------------------------//
//  File Name: CancelFlightView.jsx
//  Description: Main Component for Cancel Flight
//
//  Requirements:
//      - App.jsx
//
//  Renders:
//      - Seat Selection Main Component
//
// Created By: Corey Yang-Smith
// Date: November 29th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useState } from 'react';

// MUI Imports
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

// React Hook Form
import { useForm, Controller } from 'react-hook-form';

// React Router Dom
import { Link } from 'react-router-dom';

// API
import { deleteRequest } from '../../api/posts';

// Toast Notifications
import toast, { Toaster } from 'react-hot-toast';

//  MAIN FUNCTION
//-------------------------------------------------------//
const CancelFlightView = () => {
	const [flightId, setFlightId] = useState('');
	// const [email, setEmail] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm();

	const onSubmit = async (FieldValues) => {
		try {
			// Axios Post
			await deleteRequest('tickets/' + FieldValues.ticket_id, FieldValues);
			toast.success(
				'Ticket ' + FieldValues.ticket_id + ' successfully deleted.',
				{
					duration: 4000,
					position: 'top-right',
				}
			);
			reset();
			setFlightId('')
		} catch (err) {
			toast.error('Error processing request');
			if (err.response) {
				// Not in 200 response range
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			} else {
				console.log(`Error: ${err.message}`);
			}
		}
	};

	return (
		<Grid
			container
			direction="row"
			sx={{ background: '#121212', padding: '2%' }}
		>
			<Grid
				container
				item
				xs={2}
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
			</Grid>
			<Grid
				container
				item
				xs={3}
				sx={{ direction: 'flex', justifyContent: 'center' }}
			>
				<Stack direction="column">
					<Typography
						variant="h6"
						sx={{ borderBottom: '1px solid white' }}
					>
						Cancel Ticket
					</Typography>
					<Typography>
						To cancel your ticket, please enter your ticket ID.
					</Typography>
				</Stack>
			</Grid>

			<Grid
				container
				item
				xs={7}
				sx={{
					direction: 'flex',
					justifyContent: 'center',
					width: '100%',
					padding: '16px',
				}}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ width: '100%' }}
				>
					<Toaster />
					<Stack
						direction="column"
						sx={{ width: '100%' }}
						spacing={2}
					>
						<Controller
							control={control}
							name="ticket_id"
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...register('ticket_id', {
										required: 'Ticket ID is Required',
										pattern: {
											value: /^\d+$/,
											message: 'Must be valid Ticket ID',
										},
									})}
									fullWidth
									required
									label="Enter Ticket ID"
									value={flightId}
									onChange={(e) => setFlightId(e.target.value)}
								/>
							)}
						/>
						{/* {errors.ticket_id && (
								<p style={{ color: 'red' }}>{`${errors.ticket_id.message}`}</p>
							)} */}

						{/* <TextField
							{...register('email', {
								required: true,
								pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Must be valid email"},
							})}
							fullWidth
							required
							label="Enter User Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && <p style={{color: 'red'}}>{`${errors.email.message}`}</p>} */}
						<Button
							fullWidth
							variant="outlined"
							type="submit"
						>
							Cancel Flight
						</Button>
					</Stack>
				</form>
			</Grid>
		</Grid>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default CancelFlightView;
