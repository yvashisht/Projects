import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../../api/posts';
import { useState, useContext } from 'react'; // Add useContext here
import { AuthContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);    
    const username = data.get('username');
    const password = data.get('password');
  
    loginUser({ username: username, password: password })
      .then((data) => {
        console.log('Login successful:', data);
        setUser({ username: username, ...data }); // Set user state to username
        navigate('/'); // Navigate to Landing page
      })
      .catch((error) => {
        console.error('Error during login:', error);
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
            // marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <FlightTakeoffIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="outlined-password-input"
              autoComplete="current-password"
              InputProps={{ // Add this prop
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      // color="primary" // Change this to the color that suits your theme
                      color={showPassword ? 'primary' : 'disabled'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {errorMessage && (
              <Typography color="error">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '16.5px'}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
