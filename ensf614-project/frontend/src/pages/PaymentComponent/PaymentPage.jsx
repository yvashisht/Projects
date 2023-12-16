import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.jsx';
import stripePromise from './stripe.jsx';
import { Box } from '@mui/material';

const PaymentPage = () => {
	return (
		<Box sx={{background: "#121212"}}>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</Box>
	);
};

export default PaymentPage;
