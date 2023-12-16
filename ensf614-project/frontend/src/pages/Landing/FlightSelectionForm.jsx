//-------------------------------------------------------//
//  File Name: FlightSelectionForm.jsx
//  Description: Form Information for Flight Selection
//
//  Requirements:
//      - FlightSelectionMain.jsx
//
//  Renders:
//      - FlightSelectionForm.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Imports
import React, { useRef } from 'react';
import { useState, useContext } from 'react';

// MUI Imports
import {
	Autocomplete,
	Button,
	ButtonGroup,
	Divider,
	Stack,
	TextField,
	createFilterOptions,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DestinationArrivalForm from './DestinationArrivalForm';

//CSS
import './landing.css';

// My Context
import { Context } from './Landing';

// RHF
import { useForm, Controller } from 'react-hook-form';

// My Components
import PassengerButtonGroup from './PassengerButtonGroup';
import FlightSelectionButton from './FlightSelectionButton';
import SeatSelectionRadio from './SeatSelectionRadio';
import { queryFlights } from '../../api/posts';
import { NUM_DAYS } from "../../utils/config.js"

// Day JS
import dayjs from 'dayjs';


//  MAIN FUNCTION
//-------------------------------------------------------//
const FlightSelectionForm = (props) => {
	const [selectedTrip, setSelectedTrip] = useState('OneWay');
	const [date, setDate] = useState('');
	const [fromObj, setFromObj, toObj, setToObj, flightList, setFlightList] = useContext(Context);
	const formFilled = useRef(false);
	const startDate = dayjs(new Date())
	const endDate = dayjs(new Date()).add(NUM_DAYS, 'days');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		control,
	} = useForm();

	// Utility
	const onSubmit = async (FieldValues) => {
		try {
			const displayedFlights = await queryFlights(FieldValues);
			setFlightList(displayedFlights);
			props.setToggle(true)
		}
		catch (err) {
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

	const filterOptions = createFilterOptions({
		ignoreCase: true,
		matchFrom: 'start',
		limit: 55,
	});

	// TODO expand this logic to ensure flight selection is "mostly" valid
	if (fromObj.id !== undefined && toObj.id !== undefined && date !== '') {
		formFilled.current = true;
	}

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}
		>
			<Stack
				direction="column"
				spacing={1}
			>
				{/* Return or One Way Button Selection */}
				<ButtonGroup variant="outlined">
				<Button
						className={`flight-button ${selectedTrip === 'OneWay' && 'active'}`}
						onClick={() => setSelectedTrip('OneWay')}
					>
						One-Way
					</Button>
					<Button
						className={`flight-button ${selectedTrip === 'Return' && 'active'}`}
						onClick={() => setSelectedTrip('Return')}
						disabled
					>
						Return Trip
					</Button>

				</ButtonGroup>

				{/* Destination & Arrival Selection*/}
				<Stack direciton="row" spacing={1.25}>
					<Controller
						control={control}
						name="start_point"
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								onChange={(event, item) => {
									setFromObj(item);
									onChange(item);
								}}
								value={value || null}
								options={props.destinations}
								label="Departure Location"
								getOptionLabel={(option) =>
									`${option['airport_code']} | ${option['name']}`
								}
								filterOptions={filterOptions}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Destination"
										placeholder="Select a Destination Location"
									/>
								)}
							/>
						)}
					/>

					<Controller
						control={control}
						name="end_point"
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								onChange={(event, item) => {
									setToObj(item);
									onChange(item);
								}}
								value={value || null}
								sx={{width: "450px"}}
								options={props.destinations}
								label="Departure Location"
								getOptionLabel={(option) =>
									`${option['airport_code']} | ${option['name']}`
								}
								filterOptions={filterOptions}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Arrival"
										placeholder="Select an Arrival Location"
									/>
								)}
							/>
						)}
					/>
				</Stack>

				<Divider/>
				{/* Departure & Return Dates*/}
				<Controller
					control={control}
					name="date"
					defaultValue=""
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Departure Date"
								required
								placeholderText="Select date"
								minDate={startDate}
								maxDate={endDate}
								onChange={(event, item) => {
									field.onChange(dayjs(event.$d).format('YYYY-MM-DD'))
									setDate(dayjs(event.$d).format('YYYY-MM-DD'))
								}}
								selected={field.value}
							/>
						</LocalizationProvider>
					)}
				/>

				<Button
					type="submit"
					variant="outlined"
					color="primary"
					disabled={formFilled.current ? false : true}
					fullWidth
				>
					Find Flights
				</Button>
			</Stack>
		</form>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default FlightSelectionForm;
