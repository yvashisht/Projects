import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { registerUser } from '../../api/posts';
import { useState, useContext } from 'react'; // Add useContext here
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';


export default function SignUp() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const password2 = data.get('password2');
    const email = data.get('email'); // Add this if your registration requires an email
    const firstName = data.get('first_name'); 
    const lastName = data.get('last_name'); 

    registerUser({username: username, password: password, 
                  email: email, first_name: firstName, // Add this
                  last_name: lastName, password2: password2 // Add this
      })
      .then((data) => {
        console.log('Registration successful:', data);
        setUser({ username: username, ...data }); // Set user state to username
        navigate('/'); // Navigate to Landing page
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        console.error('Server response:', error.response.data);
        setErrorMessage('Invalid credentials');
        throw error;
      });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'black.default', // Use the black color for the Login page
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // This will vertically center the login form
      }}
    >
      <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                mt: 3,
                ml: 3,
            }}
        >
            <Button variant="outlined" sx={{ fontSize: '16.5px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography color="primary">Return</Typography>
                </Link>
            </Button>
        </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FlightTakeoffIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="outlined-password-input"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color={showPassword ? 'primary' : 'disabled'}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6.5}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type={showPassword2 ? 'text' : 'password'}
                  id="outlined-password2-input"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color={showPassword2 ? 'primary' : 'disabled'}
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '16.5px'}}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}