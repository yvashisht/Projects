/**
 * getSeatName
 * @param {*} row int: row number
 * @param {*} col int: column number
 * @returns
 */
export function getSeatName(seat) {
	var seatName = '';
	const col = seat.column_position;
	const row = seat.row_position;

	seatName = (row + 1).toString();
	seatName += String.fromCharCode(97 + col).toUpperCase();

	return seatName;
}

/**
 * getSeatType
 * @param {*} seat Seat : Seat Object
 * @returns String: Seat Type
 */
export function getSeatType(seat) {
	if (seat.type == 'ORD') return 'Ordinary';
	if (seat.type == 'CMF') return 'Comfort';
	if (seat.type == 'BUS') return 'Business Class';
}

/**
 * getSeatCost
 * @param {*} seat  Seat : Seat Object
 * @returns String : Seat Cost
 */
export function getSeatCost(seat) {
	var cost = seat.amount * seat.multiplier;
	var cost = '$' + cost;

	return cost;
}
