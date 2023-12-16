//-------------------------------------------------------//
//  File Name: DestinationSelectionDropdown.jsx
//  Description: Dropdown Autocomplete component for Destination
//
//  Requirements:
//      - DestinationArrivalForm.jsx
//
//  Renders:
//      - DestinationSelectionDropdown.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';

// MUI Import
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';

//  MAIN FUNCTION
//-------------------------------------------------------//

const DestinationSelectionDropdown = (props) => {


	const filterOptions = createFilterOptions({
		ignoreCase: true,
		matchFrom: 'start',
		limit: 55,
	});

	function handleChange(event, values) {
		props.setObj(values)
	}

	// Display Loading if Data not loaded
	if (props.data.length == 0) {
		return (
			<Autocomplete
				options={["loading..."]}
				getOptionLabel={(option) => option}
				renderInput={(params) => (
					<TextField
						{...params}
						label={props.where}
					/>)}
				sx={{ width: '300px' }}
			/>
		);
	}

	return (
		<Autocomplete
			options={props.data}
			getOptionLabel={(option) => `${option['airport_code']} | ${option['name']}`}
			filterOptions={filterOptions}
			renderInput={(params) => (
				<TextField
					{...params}
					label={props.where}
				/>
			)}
			sx={{ width: '300px' }}
			onChange={handleChange}
		/>
	);
};

//  EXPORTS
//-------------------------------------------------------//

export default DestinationSelectionDropdown;
