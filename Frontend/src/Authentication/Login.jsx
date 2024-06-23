/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material'; // Added Alert for error messages
import { useNavigate } from 'react-router-dom';
import { LoginApi } from './Auth.Api';
import { setAccessTokenCookie, setAdminValueCookies } from '../helper/cookies';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const {
        register, // Hook for binding input fields
        handleSubmit, // Hook for handling form submission
        formState: { errors }, // Hook for form validation state
        clearErrors // Hook for clearing all errors
    } = useForm();
    const [serverError, setServerError] = React.useState(null); // State for handling server-side errors

    const { mutate: userLogin } = LoginApi('v1/user/login');

    // Function to handle form submission
    const loginData = (data) => {
        clearErrors(); // Clear any previous errors
        setServerError(null); // Reset server error state

        userLogin(data, {
            onSuccess: (res) => {
                if (res.responseCode === 200) {
                    setServerError('Login successful'); // Display success message
                    setAccessTokenCookie(res.responseDataParams.data.token); // Set token in cookies
                    setAdminValueCookies(res.responseDataParams.data.isAdmin); // Set admin value in cookies
                    navigate('/home'); // Navigate to the home page
                    window.location.reload();
                } else {
                    setServerError(res.responseDataParams.data.message); // Set server error message
                }
            },
            onError: (err) => {
                console.error('Login error:', err); // Log error
                setServerError('An error occurred during login. Please try again.'); // Set generic error message
            }
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            {serverError && <Alert severity="error">{serverError}</Alert>}
            <form onSubmit={handleSubmit(loginData)}>
                {' '}
                {/* Added onSubmit to handle form submission */}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    {...register('email', { required: 'Email is required' })} // Bind input to form state and add validation
                    error={!!errors.email} // Display error if validation fails
                    helperText={errors.email?.message} // Show validation message
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    {...register('password', { required: 'Password is required' })} // Bind input to form state and add validation
                    error={!!errors.password} // Display error if validation fails
                    helperText={errors.password?.message} // Show validation message
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit" // Changed to type="submit" to handle form submission
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account? <a href="/signup">Sign up</a>
                </Typography>
            </form>
        </Container>
    );
};

export default Login;
