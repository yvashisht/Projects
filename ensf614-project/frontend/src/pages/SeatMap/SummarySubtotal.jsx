//-------------------------------------------------------//
//  File Name: SummarySubtotal.jsx
//  Description: Subtotal considering Seat + Insurance Selection
//
//  Requirements:
//      - SeatSelectionForm.jsx
//
//  Renders:
//      - Subtotal + Confirmation for Seat Selection
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useState } from 'react';

// MUI Import
import { Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

// React Router Dom
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SubtotalLineItem from './SubtotalLineItem';
import SubtotalCalculation from './SubtotalCalculation';
import TaxCalculation from './TaxCalculation';
import TitleLineItem from './TitleLineItem';
import DiscountCalculation from './DiscountCalculation';
import DiscountTotalCalculation from './DiscountTotalCalculation';

//  MAIN FUNCTION
//-------------------------------------------------------//
const SummarySubtotal = (props) => {
	let { state } = useLocation();

	const [subtotal, setSubtotal] = useState(0);
	const [discountedTotal, setDiscountedTotal] = useState(0);
	const [total, setTotal] = useState(0);

	/**
	 * getPriceFromFlight
	 * @param {*} flight Flight : Flight Object
	 * @returns String : Calculated Flight Cost
	 */
	function getPriceFromFlight(flight) {
		const distance = Math.floor(flight.distance); // in km
		const gasCost = 0.07; // in $/km
		const flightCost = (distance * gasCost).toFixed(2);

		return flightCost;
	}

	/**
	 * getSeatCost
	 * @param {*} seat  Seat : Seat Object
	 * @returns String : Seat Cost
	 */
	function getSeatCost(seat) {
		var cost = seat.amount * seat.multiplier;
		return cost;
	}

	const navigate = useNavigate();

	const handlePayment = () => {
		navigate('/payment', {
			state: {
				flight: state.flight,
				seat: props.seat,
				insurance: props.insurance,
				total: total,
			},
		});
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
				<TitleLineItem title="SUBTOTAL" />

				<Grid
					container
					item
					xs={9}
					sx={{ paddingTop: '8px', marginBottom: '12px' }}
				>
					<Stack
						direction="column"
						sx={{ width: '100%', padding: '8px' }}
					>
						<SubtotalLineItem
							name={'Flight'}
							amount={getPriceFromFlight(state.flight)}
							quantity={1}
						/>
						<SubtotalLineItem
							name={'Seat'}
							amount={getSeatCost(props.seat)}
							quantity={1}
						/>
						{props.insurance && (
							<SubtotalLineItem
								name={'Insurance'}
								amount={50}
								quantity={1}
							/>
						)}

						<Divider />

						<SubtotalCalculation
							flightCost={getPriceFromFlight(state.flight)}
							seatCost={getSeatCost(props.seat)}
							insurance={props.insurance}
							setSubtotal={setSubtotal}
						/>

						{props.discount && (
							<DiscountCalculation discountAmount={props.discountAmount} />
						)}
						{props.discount && (
							<DiscountTotalCalculation
								subtotal={subtotal}
								discountAmount={props.discountAmount}
								discountedTotal={discountedTotal}
								setDiscountedTotal={setDiscountedTotal}
							/>
						)}
						<TaxCalculation
							subtotal={subtotal}
							discountedTotal={discountedTotal}
							discount={props.discount}
							setTotal={setTotal}
						/>
						<Divider />
						<Stack
							direction="row"
							sx={{
								display: 'flex',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<Typography>Total</Typography>
							<Typography>${total}</Typography>
						</Stack>
					</Stack>
				</Grid>
				<Button
					onClick={handlePayment}
					sx={{
						fontSize: 'larger',
						padding: '10px 20px',
						border: '2px solid',
						borderColor: 'primary.main',
						borderRadius: '4px',
					}}
				>
					Proceed to Payment
				</Button>
			</Grid>
		</Paper>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default SummarySubtotal;
