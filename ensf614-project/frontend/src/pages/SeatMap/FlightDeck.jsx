//-------------------------------------------------------//
//  File Name: FlightDeck.jsx
//  Description: Flight Deck main components for seat selection
//
//  Requirements:
//      - TODO.jsx
//
//  Renders:
//      - Renders page
//
// Created By: Corey Yang-Smith
// Date: November 13th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//
// React Import
import React from 'react';

// My Component Import
import Seat from './Seat';
import { useAircrafts } from '../../hooks/useAircrafts.js';
import { useSeats } from '../../hooks/useSeats.js';

// MUI Imports
import { Grid, Paper, Typography } from '@mui/material';
import Aisle from './Aisle.jsx';
import { useLocation } from 'react-router-dom';
import { useTicketsByFlight } from '../../hooks/useTicketsByFlight.js';
import { useSeatsByAircraft } from '../../hooks/useSeatsByAircraft.js';

// Styles
const frostedGlassSX = {
	background: 'rgba(255,255,255,.3)',
	display: 'flex',
	padding: '16px',
	zIndex: '100',
	width: '100px',
	height: '500px',
	marginLeft: '50px',
	marginTop: '50px',
};

//  MAIN FUNCTION
//-------------------------------------------------------//
const FlightDeck = (props) => {
	let { state } = useLocation();

	// Given Plane, get needed properties
	// Data Preprocessing
	const myAircraft = state.flight.aircraft_ref;
	const { seatsByAircraft } = useSeatsByAircraft(state.flight.aircraft_ref.id);
	const { ticketsByFlight } = useTicketsByFlight(state.flight.id);

	// Get Max Rows & Columns
	var maxCols = 0;
	var maxRows = 0;
	seatsByAircraft.forEach((seat) => {
		if (seat.row_position + 1 > maxRows) maxRows = seat.row_position + 1;
		if (seat.column_position + 1 > maxCols) maxCols = seat.column_position + 1;
	});

	if (myAircraft != undefined) var columnLayout = myAircraft.seat_columns;

	/**
	 * generateColumnLayout
	 * @param {*} columnLayout String: airplane column layout defined as eg. "3-3-3"
	 * @returns 1-D Array of Column Layout, populated with "1" for Seat
	 */
	function generateColumnLayout(columnLayout) {
		const numbers = columnLayout.split('-');
		const columnsWidth = numbers.reduce(
			(acc, num) => acc + parseInt(num, 10),
			0
		);

		const colArray = [];

		for (var i = 0; i < columnsWidth; i++) {
			colArray.push(1);
		}

		return colArray;
	}

	/**
	 * generateSeatMap
	 * @param {*} maxRows Int: max number of rows to generate
	 * @param {*} columnLayout String: airplane column layout defined as eg. "3-3-3"
	 * @returns 2-D Array of Seats, populated with "1" for Seat, and "0" for Aisle
	 */
	function generateSeatMap(maxRows, columnLayout) {
		var seatMap = [];

		for (var row = 0; row < maxRows; row++) {
			seatMap.push(generateColumnLayout(columnLayout));
		}

		return seatMap;
	}

	/**
	 * mapSeatsToSeatMap: Maps the Seats to the SeatMap Array
	 * @param {*} seats: Array of Seats on Selected Flight
	 * @param {*} seatMap: SeatMap 2D Array
	 * @returns: Seat Map (2D Array) with Aisle and Seats
	 */
	function mapSeatsToSeatMap(seats, seatMap) {
		seats.forEach((seat) => {
			if (
				seat.hasOwnProperty('row_position') &&
				seat.hasOwnProperty('column_position')
			) {
				if (
					seat.row_position >= 0 &&
					seat.row_position < seatMap.length &&
					seat.column_position >= 0 &&
					seat.column_position < seatMap[seat.row_position].length
				) {
					if (seatMap[seat.row_position][seat.column_position] == 1)
						seatMap[seat.row_position][seat.column_position] = seat;
				} else {
					console.warn('Seat position is outside of SeatMap Bounds: ', seat);
				}
			} else {
				console.warn(
					'Seat does not have valid row and column positions: ',
					seat
				);
			}
		});

		return seatMap;
	}

	/**
	 * addAislesToSeatMap
	 * @param {*} seatMap 2D Array: Mapped Aircraft Seats
	 * @param {*} columnLayout String:
	 * @returns 2D Array: Contains Seat Objects and "0" (Placeholders) for Aisle
	 */
	function addAislesToSeatMap(seatMap, columnLayout) {
		const seatLayout = columnLayout.split('-');

		const newSeatMap = [];
		const numRows = seatMap.length;

		for (var i = 0; i < numRows; i++) {
			var relCol = 0;
			var colArray = [];

			// Entire Rows
			for (var j = 0; j < seatLayout.length; j++) {
				// Seat Sections (+ Aisle)
				for (var k = 0; k < seatLayout[j]; k++) {
					colArray.push(seatMap[i][relCol]);
					relCol++;
				}
				if (j != seatLayout.length - 1) colArray.push(0);
			}

			newSeatMap.push(colArray);
		}
		return newSeatMap;
	}

	/**
	 * getSeatAvailability
	 * @param {*} seatMap
	 * @param {*} ticketsByFlight
	 * @returns SeatMap: Returns Seatmap with additional attribute 'available'
	 */
	function getSeatAvailability(seatMap, ticketsByFlight) {
		seatMap.forEach((row) => {
			row.forEach((seat) => {
				if (typeof seat === 'object') {
					seat.available = true
					ticketsByFlight.forEach((ticket) => {
						if (seat.id == ticket.seat_ref.id) {
							seat.available = false;
							return;
						}
					})
				}
			});
		});
		return seatMap;
	}

	// If Valid Column Layout on Airplane, pre-process data
	var seatMap = [];
	if (columnLayout != undefined) {
		seatMap = generateSeatMap(maxRows, columnLayout);
		seatMap = mapSeatsToSeatMap(seatsByAircraft, seatMap);
		seatMap = addAislesToSeatMap(seatMap, columnLayout);
		seatMap = getSeatAvailability(seatMap, ticketsByFlight);
	}

	const populateSeats = seatMap.map((rows) => {
		return (
			<Grid container>
				{rows.map((seat) => {
					if (seat != 0)
						return (
							<Seat
								flight={state.flight}
								seat={seat}
								setSelectedSeat={props.setSelectedSeat}
							/>
						);
					if (seat == 0) return <Aisle />;
				})}
			</Grid>
		);
	});

	if (seatMap.length > 0) {
		return <Paper sx={{ frostedGlassSX }}>{populateSeats}</Paper>;
	} else {
		return <p>loading...</p>;
	}
};

//  EXPORTS
//-------------------------------------------------------//
export default FlightDeck;
