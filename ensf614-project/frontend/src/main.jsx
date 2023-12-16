import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import { StripeProvider } from 'react-stripe-elements';
// import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// const stripePromise = loadStripe('pk_test_51OC8jgCQlBoyLNaWHKEXgvdaYgzAviXr6hWXuS1W4ABUyFLPU1rGZ0PLFIV5fTGqGuLDSzxIsDMb4VLMKTey2SM600RX3nqvf1');

// function PaymentApp() {
//     return (
//         <StripeProvider stripe={stripePromise}>
//             <MyStore />
//         </StripeProvider>
//     );
// }
