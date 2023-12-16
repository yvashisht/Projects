//-------------------------------------------------------//
//  File Name: PromotionSelection.jsx
//  Description: Insurance Selection for Seat
//
//  Requirements:
//      - SeatSelectionForm.jsx
//
//  Renders:
//      - Seat Selection Discount Code
//
// Created By: Corey Yang-Smith
// Date: December 1st, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useState } from 'react';

// MUI Import
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

// My Components
import TitleLineItem from './TitleLineItem';

// Toast Notifications
import toast, { Toaster } from 'react-hot-toast';

// React Hook Forms
import { useForm, Controller } from 'react-hook-form';
import { getRequest, deleteRequest } from '../../api/posts';

//  MAIN FUNCTION
//-------------------------------------------------------//
const PromotionSelection = (props) => {
	const [promoCode, setPromoCode] = useState('');

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
			const promo_info = (
				await getRequest('promos/' + FieldValues.promo_code, FieldValues)
			).data[0];
			await deleteRequest('promos/' + FieldValues.promo_code, FieldValues);

			if (promo_info != undefined) {
				console.log(promo_info);
				toast.success(
					'PromoCode ' + FieldValues.promo_code + ' successfully applied.',
					{
						duration: 4000,
						position: 'top-right',
					}
				);
				reset();
				props.setDiscountAmount(promo_info.discount_percentage);
				props.setDiscount(true);
				setPromoCode('');
			}
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
		<Paper
			elevation={4}
			sx={{ background: '#161616', borderRadius: '15px' }}
		>
			<Grid
				container
				direction="column"
			>
				<TitleLineItem title="PROMO CODE" />

				<Toaster />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack
						direction="row"
						sx={{
							padding: '16px',
							direction: 'flex',
							justifyContent: 'space-around',
						}}
					>
						<Controller
							control={control}
							name="promo_code"
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...register('promo_code', {
									required: 'Promo Code is Required',
										pattern: {
											value: /^[a-zA-Z0-9]+$/,
											message: 'Must be valid Promo Code',
										},
									})}
									label="Enter Promo Code"
									value={promoCode}
									onChange={(e) => setPromoCode(e.target.value)}
								/>
							)}
						/>

						<Button
							type="submit"
							variant="outlined"
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Grid>
		</Paper>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default PromotionSelection;
