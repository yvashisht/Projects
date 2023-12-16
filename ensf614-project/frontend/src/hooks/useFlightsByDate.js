//-------------------------------------------------------//
//  File Name: useFlightsByDate.js
//  Description: Data Fetching Hook to obtain "Flight" model from the local database based on selected date
//
//  Requirements:
//      - /api/posts (axios)
//
//  Returns:
//      - List of Aircrafts
//
// Created By: Corey Yang-Smith
// Date: November 29th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { useEffect, useState } from 'react';

// API Import
import { getRequest } from '../api/posts';

//  MAIN FUNCTION
//-------------------------------------------------------//

export const useFlightsByDate = (date) => {
	const [flightsBydate, setFlightsByDate] = useState([]);

	myFlights = [];
	console.log(date)

	const fetchData = async () => {
		try {
			const response = await getRequest('flights/', '');
			if (response && response.data) {
				var data = response.data
				data.forEach((el) =>{
					if (el.date == date) myFlights.push(el);
				})
				setFlightsByDate(myFlights)

				
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

	return { flightsBydate, setFlightsByDate };
};
