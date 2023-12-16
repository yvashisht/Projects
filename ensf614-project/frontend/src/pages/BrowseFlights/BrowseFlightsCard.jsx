import {
	Card,
	CardActionArea,
	CardContent,
	Collapse,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { useFlights } from '../../hooks/useFlights.js';
import { useState } from 'react';

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

function BrowseFlightsCard(props) {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const displayCrews = props.flight.crews_ref.map((crew) => {
		return (
			<li style={{color: 'black'}} key={crew}>{crew}</li>
		)
	})

	return (
			<Card
				sx={paperSX}
				elevation={2}
			>
				<CardActionArea onClick={() => handleExpandClick()}>
					<CardContent>
						<Stack
							direction="row"
							spacing={1}
						>
							<Typography sx={textSX}>ID: {props.flight.id} |</Typography>
							<Typography sx={textSX}>
								From: {props.flight.start_point.name} |
							</Typography>
							<Typography sx={textSX}>To: {props.flight.end_point.name} |</Typography>
							<Typography sx={textSX}>
								Aircraft: {props.flight.aircraft_ref.type}
							</Typography>
						</Stack>

						<Collapse in={expanded} timeout="auto">
							<p style={{color: 'black'}}>Assigned Crew Members:</p>
							<ul>
								{displayCrews}
							</ul>
						</Collapse>
					</CardContent>
				</CardActionArea>
			</Card>
	);
}

// EXPORTS
//-------------------------------------------------------//
export default BrowseFlightsCard;
