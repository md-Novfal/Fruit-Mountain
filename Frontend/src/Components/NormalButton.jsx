/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

export const NormalButton = ({ label, onClick }) => {
    return (
        <>
            <Button
                disableRipple
                disableFocusRipple
                // sx={{ backgroundColor: background, color: color, ...sx }}
                // startIcon={startIcon}
                onClick={onClick}
            >
                {label}
            </Button>
        </>
    );
};
