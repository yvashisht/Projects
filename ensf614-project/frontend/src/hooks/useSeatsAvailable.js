//-------------------------------------------------------//
//  File Name: useSeatsAvailable.js
//  Description: Data Fetching Hook to obtain "Seats" model based on Selected Aircraft and Tickets, determines seat availability
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

// query tickets
// if any tickets match seat id and flight id, seat taken

export const useSeatsAvailable = (seat_id, flight_id) => {
	const [seatAvailable, setSeatAvailable] = useState(true);
	var mySeats = [];
	var selectedAircraft = [];

	const fetchData = async () => {
		try {
			const tickets = (await getRequest(`flights/${flight_id}`, '')).data;
			tickets.forEach((ticket) => {
				if (ticket.seat_ref == seat_id) {
					console.log("seat taken")
					setSeatAvailable(false)
				}
			})


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

	return { seatAvailable, setSeatAvailable };
};
