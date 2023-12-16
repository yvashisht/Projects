//-------------------------------------------------------//
//  File Name: NavBar.jsx
//  Description: Responsive Navigation Bar for Landing Page
//
//  Requirements:
//      - Landing.jsx
//
//  Renders:
//      - Navigation Bar
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from 'react';
import { useContext, useState, useEffect } from 'react';

// Routing
// import StyledLink from '../../components/StyledLink';
// import StyledHashLink from '../../components/StyledHashLink';
// import StyledHomeHashLink from '../../components/StyledHomeHashLink';
import { AuthContext } from '../App';
// React Router Import
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// MUI Import
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Grid } from '@mui/material/';
import NavigationButton from './NavigationButton';
import { logoutUser, getUserGroups } from '../api/posts';

//  STYLES
//-------------------------------------------------------//

const toolbarSX = {
	display: 'flex',
	justifyContent: 'center',
};

//  MAIN FUNCTION
//-------------------------------------------------------//

const NavBar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
		const groups = JSON.parse(localStorage.getItem('groups'));
		setUserGroups(groups);
	}, []);

    const handleLogout = async () => {
        console.log('Handle Logout function is being called');
        try {
            await logoutUser();
            setUser(null); // clear user from context
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
	// let username = localStorage.getItem('username');
	return (
		<AppBar
			position="sticky"
			elevation={1}
			style={{ background: "black" }}
			sx={{ width: "100vw" }}
		>
			<Toolbar
				variant="regular"
				sx={toolbarSX}
			>
				<Grid
					container
					justifyContent="space-evenly"
					alignItems="stretch"
				>
					<Grid
						container
						item
						xs={2}
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
					>
						<Typography variant="landing_title">FLIGHT.LY</Typography>
						
						
						
					</Grid>

					<Grid
						container
						item
						xs={4}
						direction="row"
						justifyContent="center"
						alignItems="center"
					>{user ? <div>Welcome, {user.username}!</div> : null}
					</Grid>
					
					<Grid
						container
						item
						xs={6}
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
					>
						{user ? (
							<>
								{userGroups.includes('sysadmin') && <NavigationButton label="Admin" path="/admin" color="primary" />}
								{userGroups.includes('Flight Attendant') && <NavigationButton label="Passenger List" path="/passengerlist" color="primary" />}
								<NavigationButton label="Cancel Flight" path="/cancel" color="primary" />
								<Button 
									variant="contained" 
									color="c2a" 
									size="small"
									sx={{ marginRight: "16px" }}
									onClick={handleLogout}
								>
									<Link to="/" style={{ textDecoration: "none" }}>
										<Typography variant='landing_button'>Logout</Typography>
									</Link>
								</Button>
							</>
						) : (
							<>
								<NavigationButton label="Cancel Flight" path="/cancel" color="primary" />
								<NavigationButton label="Login" path="/login" color="primary" />
								<NavigationButton label="Signup" path="/register" color="c2a" />
							</>
						)}
					</Grid>

				</Grid>
			</Toolbar>
		</AppBar>
	);
};

//  EXPORTS
//-------------------------------------------------------//

export default NavBar;
