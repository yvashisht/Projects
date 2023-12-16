//-------------------------------------------------------//
//  File Name: useFlights.js
//  Description: Data Fetching Hook to obtain "Flight" model from the local database
//
//  Requirements:
//      - /api/posts (axios)
//
//  Returns:
//      - List of Aircrafts
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

export const useFlights = () => {
	const [flights, setFlights] = useState([]);

	const fetchData = async () => {
		try {
			const response = await getRequest('flights/', '');
			if (response && response.data) {
				setFlights(response.data);
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

	return { flights, setFlights };
};
