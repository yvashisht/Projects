//-------------------------------------------------------//
//  File Name: useFlightCrews.js
//  Description: Data Fetching Hook to obtain "FlightCrews" model from the local database
//
//  Requirements:
//      - /api/posts (axios)
//
//  Returns:
//      - List of FlightCrews
//
// Created By: Corey Yang-Smith
// Date: November 18th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { useEffect, useState } from 'react';

// API Import
import { getRequest } from '../api/posts';

//  MAIN FUNCTION
//-------------------------------------------------------//

export const useFlightCrews = () => {
	const [flightCrews, setFlightCrews] = useState([]);

	const fetchData = async () => {
		try {
			const response = await getRequest('flightcrews/', '');
			if (response && response.data) {
				console.log(response.data)
				setFlightCrews(response.data);
			}
		} catch (err) {
			if (err.response) {
				//Not in 200 Response Range
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			} else {
				console.log(`Error: ${err.message}`);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { flightCrews, setFlightCrews };
};
