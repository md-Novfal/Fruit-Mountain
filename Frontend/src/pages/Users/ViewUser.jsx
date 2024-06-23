/* eslint-disable no-unused-vars */
// src/pages/CreatePost.js
import { useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PageHeader } from '../../Components/PageHeader';

const ViewUser = () => {
    const { state } = useLocation();

    const {
        register,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (state.row && state.mode === 'view') {
            setValue('last', state.row.name.last);
            setValue('first', state.row.name.first);
            setValue('mobileNumber', state.row.mobileNumber);
            setValue('email', state.row.email);
        }
    }, [setValue, state.mode, state.row]);

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: { lg: '100%', md: '1000%' },
                    padding: '1.25rem 0.25rem 1.25rem 0rem'
                }}
                justifyItems={'center'}
                flexDirection={'column'}
            >
                <PageHeader navigateTo={-1} title={`${state.mode} user`} />

                <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    {...register('first', { required: 'First Name is required' })}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        readOnly: state?.mode === 'view' ? true : false
                    }}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    {...register('last', { required: 'Last Name is required' })}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        readOnly: state?.mode === 'view' ? true : false
                    }}
                />
                <TextField
                    fullWidth
                    label="Mobile number"
                    margin="normal"
                    {...register('mobileNumber', { required: 'mobile Number is required' })}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        readOnly: state?.mode === 'view' ? true : false
                    }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    {...register('email', { required: 'Email is required' })}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        readOnly: state?.mode === 'view' ? true : false
                    }}
                />
            </Box>
        </div>
    );
};

export default ViewUser;
