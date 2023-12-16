import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <Container maxWidth="sm" style={{ textAlign: 'center', color: 'white', padding: '50px', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>
                    Payment Successful!
                </Typography>
                <Typography variant="h6">
                    Thank you for your payment. Your transaction has been completed.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBackToHome}
                    style={{ marginTop: '20px' }}
                >
                    Return to Home
                </Button>
            </Container>
        </div>
    );
};

export default PaymentSuccess;
