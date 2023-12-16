//-------------------------------------------------------//
//  File Name: useCrews.js
//  Description: Data Fetching Hook to obtain "Crew" model from the local database
//
//  Requirements:
//      - /api/posts (axios)
//      - TODO change to authenticated
//
//  Returns:
//      - List of Crews
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { useEffect, useState } from 'react';

// API Import
import { getRequest } from '../api/posts';

//  MAIN FUNCTION
//-------------------------------------------------------//

export const useCrews = () => {
	const [crews, setCrews] = useState([]);

	const fetchData = async () => {
		try {
			const response = await getRequest('crews/', '');
			if (response && response.data) {
				setCrews(response.data);
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

	return { crews, setCrews };
};
