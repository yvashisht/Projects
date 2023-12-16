//-------------------------------------------------------//
//  File Name: useAircrafts.js
//  Description: Data Fetching Hook to obtain "Aircraft" model from the local database
//
//  Requirements:
//      - /api/posts (axios)
//
//  Returns:
//      - List of Aircrafts
//
// Created By: Corey Yang-Smith
// Date: November 13th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { useEffect, useState } from 'react';

// API Import
import { getRequest } from '../api/posts';

//  MAIN FUNCTION
//-------------------------------------------------------//

export const useSeats = () => {
	const [seats, setSeats] = useState([]);

	const fetchData = async () => {
		try {
			const response = await getRequest('seats/', '');
			if (response && response.data) {
				setSeats(response.data);
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

	return { seats, setSeats };
};
