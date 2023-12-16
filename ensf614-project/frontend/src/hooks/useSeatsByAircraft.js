//-------------------------------------------------------//
//  File Name: useSeatsByAircraft.js
//  Description: Data Fetching Hook to obtain "Seats" model based on Selected Aircraft
//
//  Requirements:
//      - /api/posts (axios)
//
//  Returns:
//      - List of Aircrafts
//
// Created By: Corey Yang-Smith
// Date: November 23rd, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { useEffect, useState } from 'react';

// API Import
import { getRequest } from '../api/posts';

//  MAIN FUNCTION
//-------------------------------------------------------//

export const useSeatsByAircraft = (id) => {
	const [seatsByAircraft, setSeatsByAircraft] = useState([]);

	const fetchData = async () => {
		try {
			const response = await getRequest('aircrafts/' + id, '');
			if (response && response.data) {
				setSeatsByAircraft(response.data);
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

	return { seatsByAircraft, setSeatsByAircraft };
};
