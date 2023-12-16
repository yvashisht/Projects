import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Collapse,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useFlights } from '../../hooks/useFlights.js';
import { useEffect, useState } from 'react';
import BrowseFlightsCard from '../BrowseFlights/BrowseFlightsCard.jsx';
import { getCrewsByFlight } from '../../api/posts.js';

// STYLES
//-------------------------------------------------------//

const paperSX = {
	display: 'flex',
	background: 'white',
	paddingLeft: '8px',
	paddingRight: '8px',
	paddingTop: '4px',
	paddingBottom: '4px',
	boxShadow: 3,
	border: '2px solid black',
	'&:hover': {
		boxShadow: 8,
	},
};

const textSX = {
	color: '#000000',
	fontWeight: 'light',
};

// MAIN FUNCTION
//-------------------------------------------------------//

function ViewCrewsByFlight() {
	const [flights, setFlights] = useState([])
	const [flightId, setFlightId] = useState('')
	const [myFlights, setMyFlights] = useState([])

	const [expandedId, setExpandedId] = useState(-1);

	useEffect(() => {
		if (flightId) {
			getCrewsByFlight(flightId)
				.then((data) => {
					setFlights(data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		} else {
			setFlights([]);
		}

		console.log("flights")
		console.log(flights)
	}, [flightId]);

	const handleSubmit = () => {
		var flightById = getFlightById(flightId);
		setMyFlights(flightById)
	}

	const displayFlights = flights.map((flight, index) => {
		console.log(flight)
		return (
			<Typography>{flight.crew_id.first_name} {flight.crew_id.last_name}</Typography>
			// <BrowseFlightsCard
			// 	flight={flight}
			// 	key={flight.id}
			// />
		);
	});


	return (
		<Stack
			direciton="column"
			spacing={2}
			sx={{ width: '100%', padding: '16px' }}
		>
			<Typography>View Crew Members by Flight ID</Typography>
			<TextField label="Enter Flight ID" value={flightId} onChange={((e) => setFlightId(e.target.value))}/>
			<Button variant="outlined" onClick={() => handleSubmit()}>View Crew Members</Button>

			<Stack
				direction="column"
				spacing={1}
			>
				{displayFlights}
			</Stack>
		</Stack>
	);
}

// EXPORTS
//-------------------------------------------------------//
export default ViewCrewsByFlight;
