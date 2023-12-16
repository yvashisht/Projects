const N_ELEMENTS = 1

// Label Settings
const LABEL_TEXT_SIZE = 0.75;
const LABEL_COLOR = 'white';
const LABEL_DOT_SIZE = LABEL_TEXT_SIZE / 4;

// Arc Settings
// TODO

// Ripple Settings
const MAX_R = 4;
const PROPAGATION_SPEED = 0.65;
const REPEAT_PERIOD = 2200;

export function GetLabelData(origin, destination) {
	var labels = [];

	// For each coordiante, will have two labels
	function getStartLabel() {
		const lat = origin.latitude;
		const lng = origin.longitude;
		const size = LABEL_TEXT_SIZE;
		const dot = LABEL_DOT_SIZE;
		const color = LABEL_COLOR;
		const airportCode = origin.airport_code;
		const name = origin.name;

		const obj = {
			lat: lat,
			lng: lng,
			size: size,
			color: color,
			dot: dot,
			airportCode: airportCode,
			name: name,
		};

		return obj;
	}

	function getEndLabel() {
		const lat = destination.latitude;
		const lng = destination.longitude;
		const size = LABEL_TEXT_SIZE;
		const dot = LABEL_DOT_SIZE;
		const color = LABEL_COLOR;
		const airportCode = destination.airport_code;
		const name = destination.name;

		const obj = {
			lat: lat,
			lng: lng,
			size: size,
			color: color,
			dot: dot,
			airportCode: airportCode,
			name: name,
		};

		return obj;
	}

	labels.push(getStartLabel());
	labels.push(getEndLabel());

	return labels;
}

export function GetRippleData(origin, destination) {
	var ripples = [];

	function getRipple(latitude, longitude) {
		const lat = latitude;
		const lng = longitude;
		const max_r = MAX_R;
		const propagation_speed = PROPAGATION_SPEED;
		const repeat_period = REPEAT_PERIOD;

		const obj = {
			lat: lat,
			lng: lng,
			maxR: max_r,
			propagationSpeed: propagation_speed,
			repeatPeriod: repeat_period,
		};

		return obj;
	}

	ripples.push(getRipple(origin.latitude, origin.longitude));
	ripples.push(getRipple(destination.latitude, destination.longitude));
	
	return ripples;
}

export function GetArcsData(origin, destination) {
	var coordinates = [];

	function getCoordinates() {
		const startCode = origin.airport_code
		const startName = origin.name
		const startLat = origin.latitude
		const startLng = origin.longitude
		const endCode = destination.airport_code
		const endName = destination.name
		const endLat = destination.latitude
		const endLng = destination.longitude
		const color = 'white';

		const obj = {
			startCode: startCode,
			startName: startName,
			startLat: startLat,
			startLng: startLng,
			endCode: endCode,
			endName: endName,
			endLat: endLat,
			endLng: endLng,
			color: color,
		};

		return obj;
	}

	coordinates.push(getCoordinates());

	return coordinates;
}

export function GetRandomElements(results) {
	const N = N_ELEMENTS;
	var randomElements = [];

	if (results != undefined && results.length > 0) {
		for (var i = 0; i < N; i++) {
			const numElements = results.length;
			const randomElement = getRandomInt(numElements);
			const randomElement2 = getRandomInt(numElements);
			randomElements.push(randomElement);
			randomElements.push(randomElement2);
		}
	}


	return randomElements;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
