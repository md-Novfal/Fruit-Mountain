/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';

export const PageHeader = ({ title, navigateTo }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                padding: '1rem 0rem 0rem 0rem'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    onClick={() =>
                        typeof navigateTo === 'string'
                            ? navigate(navigateTo.toString())
                            : navigate(navigateTo)
                    }
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: 2,
                        cursor: 'pointer'
                    }}
                >
                    <ArrowBackIos />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};
