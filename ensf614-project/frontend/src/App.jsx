//-------------------------------------------------------//
//  File Name: App.jsx
//  Description: Main Component for React Frontend
//
//  Requirements:
//      - None
//
//  Renders:
//      - App.jsx and all sub components
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// MUI Imports
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Component Imports
import React, { useState } from 'react';
import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import FlightDeck from './pages/SeatMap/FlightDeck.jsx';
import { Route, Routes } from 'react-router-dom';
import BrowseFlights from './pages/Admin/ViewCrewsByFlight.jsx';
import PaymentPage from './pages/PaymentComponent/PaymentPage.jsx';
import PassengerListPage from './pages/PassengerList/PassengerList.jsx';
import SeatSelection from './pages/SeatMap/SeatSelection.jsx';
import PassengerListView from './pages/PassengerList/PassengerListView.jsx';
import CancelFlightView from './pages/CancelFlight/CancelFlightView.jsx';
import AdminView from './pages/Admin/AdminView.jsx';
import PaymentSuccess from './pages/PaymentComponent/PaymentSucess';


export const AuthContext = React.createContext();

//  MAIN FUNCTION
//-------------------------------------------------------//

// Theme Definition
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffa000',
		},
		secondary: {
			main: '#40c4ff',
		},
		background: {
			default: '#FFFFFF',
		},
		black: {
			default: '#000000',
		},
		c2a: {
			main: '#FFFFFF',
		},
	},

	typography: {
		button: {
			textTransform: 'none',
		},
		fontFamily: [
			'Plus Jakarta Sans',
			'inter',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		landing_menu: {
			lineHeight: 1.6,
			fontSize: 16,
			fontWeight: 500,
			fontFamily: 'Plus Jakarta Sans',
			color: 'white',
		},
		landing_button: {
			lineHeight: 1.6,
			fontSize: 16,
			fontWeight: 500,
			fontFamily: 'Plus Jakarta Sans',
			color: '#000000',
		},
		table_heading: {
			lineHeight: 1.6,
			fontSize: 18,
			fontWeight: 500,
			fontFamily: 'Plus Jakarta Sans',
			color: '#FFFFFF',
		},
		table_content: {
			lineHeight: 1.6,
			fontSize: 12,
			fontWeight: 300,
			fontFamily: 'Plus Jakarta Sans',
			color: '#000000',
		},
	},
});

function App() {
	const [user, setUser] = useState(null);

	return (
		<>
			<AuthContext.Provider value={{ user, setUser }}>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Routes>
						<Route // default landing page
							path=""
							element={<Landing />}
						/>

						<Route // login page, displayed in navbar
							path="/login"
							element={<Login />}
						/>
						<Route // signup page, displayed in navbar
							path="/register"
							element={<Register />}
						/>
						<Route // signup page, displayed in navbar
							path="/cancel"
							element={<CancelFlightView />}
						/>
						<Route // admin page
							path="/admin"
							element={<AdminView />}
						/>
						<Route // for flight attendant, displayed in nav bar
							path="/passengerlist"
							element={<PassengerListView />}
						/>

						<Route // display flight info (and crew info) from selected flight, for admin panel
							path="/flightlist"
							element={<BrowseFlights />}
						/>

						<Route // for sear selection by flight id, routed after selected flight
							path="/flights/:id"
							element={<SeatSelection />}
						/>
						<Route // for payment, routed after seat selection
							path="/payment"
							element={<PaymentPage />}
						/>
						<Route
							path="/payment-success"
							element={<PaymentSuccess />}
						/>
					</Routes>
				</ThemeProvider>
			</AuthContext.Provider>
		</>
	);
}

//  EXPORTS
//-------------------------------------------------------//
export default App;
