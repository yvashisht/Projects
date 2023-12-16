import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Typography, Button, Grid, Box, TextField, Paper, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import axios from 'axios';
import { getSeatName, getSeatType } from '../../utils/SeatUtilities';

const StyledCardElementContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    '& .StripeElement': {
        width: '100%',
        padding: '30px',
    },
}));

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const theme = useTheme();
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    const { state } = useLocation();
    const flightDetails = state?.flight;
    const seatDetails = state?.seat;
    const insurance = state?.insurance;
    const total = state?.total;
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)
    const [paymentError, setPaymentError] = useState('')

    console.log(flightDetails)
    console.log(seatDetails)    

    const handleBack = () => {
        navigate(-1);
    };

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: theme.palette.text.primary,
                fontSize: '16px',
                '::placeholder': {
                    color: theme.palette.text.disabled,
                },
            },
            invalid: {
                color: theme.palette.error.main,
            },
        },
    };

    const handleInputChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            const paymentData = {
                flightDetails,
                seatDetails,
                insurance,
                total,
                userInfo,
                paymentMethodId: paymentMethod.id,
            };

            axios.post('http://127.0.0.1:8000/api/process-payment/', paymentData)
                .then(response => {
                    console.log('Payment processed: ', response.data);
                    handleSubmit;
                    if (response.status === 200) {
                        setIsPaymentSuccessful(true);
                        setPaymentError('');
                        navigate('/payment-success');
                    }
                })
                .catch(error => {
                    console.error('Error processing payment: ', error);
                    setIsPaymentSuccessful(false);
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Payment Form
            </Typography>
            {flightDetails && (
                <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h6">Flight Summary:</Typography>
                    <Stack direction="column" spacing={1}>
                        <Typography>Flight ID: {flightDetails.id}</Typography>
                        <Typography>Departure: {flightDetails.start_point.name} at {flightDetails.departure_time}</Typography>
                        <Typography>Arrival: {flightDetails.end_point.name} at {flightDetails.arrival_time}</Typography>
                        <Typography>Seat Type: {getSeatType(seatDetails)}</Typography>
                        <Typography>Seat: {getSeatName(seatDetails)}</Typography>
                        <Typography>Flight Insurance: {insurance ? 'Yes' : 'No'}</Typography>
                        <Typography>Total: ${total}</Typography>
                    </Stack>
                </Paper>
            )}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    sx={{
                        backgroundColor: '#000000',
                        borderRadius: 1,
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    sx={{
                        backgroundColor: '#000000',
                        borderRadius: 1,
                    }}
                />
                <StyledCardElementContainer>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </StyledCardElementContainer>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth onClick={handleBack}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!stripe}>
                            Pay
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CheckoutForm;
