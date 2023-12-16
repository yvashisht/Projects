//-------------------------------------------------------//
//  File Name: useCrewsByFlight.js
//  Description: Data Fetching Hook to obtain "Crew" model for selected "Flight" model from the local database
//
//  Requirements:
//      - /api/posts (axios)
//
//  Returns:
//      - List of Crew Members by Selectedd Flight
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

export const useCrewsByFlight = () => {
	const [crewsByFlight, setCrewsByFlight] = useState([]);

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
