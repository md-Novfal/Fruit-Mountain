// src/components/Signup.js
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignUpApi } from './Auth.Api';
import { setAccessTokenCookie, setAdminValueCookies } from '../helper/cookies';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null); // State for handling server-side errors

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const { mutate: userSignup } = SignUpApi('v1/user/register');

    const signUp = (data) => {
        const reqBody = {
            name: { first: data.first, last: data.last },
            mobileNumber: data.mobileNumber,
            email: data.email,
            password: data.Cpassword
        };
        userSignup(reqBody, {
            onSuccess: (res) => {
                if (res.responseCode === 200) {
                    setServerError('Login successful'); // Display success message
                    setAccessTokenCookie(res.responseDataParams.data.token);
                    setAdminValueCookies(res.responseDataParams.data.isAdmin);
                    window.location.reload();

                    navigate('/home');
                } else {
                    setServerError(res.responseDataParams.data.message);
                    // Set server error message
                }
            },
            onError: () => {
                setServerError('An error occurred during signup. Please try again.'); // Set generic error message
            }
        });
    };
    const password = watch('password');

    return (
        <Container maxWidth="sm">
            {serverError && <Alert severity="error">{serverError}</Alert>}
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                fullWidth
                label="First Name"
                margin="normal"
                {...register('first', { required: 'First Name is required' })}
                error={!!errors.first}
                helperText={errors.first?.message}
                required={true}
            />
            <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                {...register('last', { required: 'Last Name is required' })}
                error={!!errors.last}
                helperText={errors.last?.message}
                required={true}
            />
            <TextField
                fullWidth
                label="Mobile number"
                margin="normal"
                {...register('mobileNumber', { required: 'mobile Number is required' })}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber?.message}
                required={true}
            />
            <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                required={true}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                required={true}
            />
            <TextField
                fullWidth
                label="Confirm assword"
                type="password"
                margin="normal"
                {...register('Cpassword', {
                    required: 'Confirm Password is required',
                    validate: (value) => value === password || 'Passwords do not match'
                })}
                error={!!errors.Cpassword}
                helperText={errors.Cpassword?.message}
                required={true}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit(signUp)}
            >
                Sign Up
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account? <a href="/login">Login</a>
            </Typography>
        </Container>
    );
};

export default Signup;
