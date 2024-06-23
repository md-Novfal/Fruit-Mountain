/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material';
// import theme from '@/styles/Theme';
import { NormalButton } from './NormalButton';

export const TableHeader = ({ navigateToUserProfile, tableName, lableAddButton }) => {
    return (
        <Box
            sx={{
                padding: '2rem 0.75rem 0.50rem 0.75rem',
                width: '90%'
            }}
        >
            <Stack
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
                flexDirection={'row'}
            >
                <Typography variant="h5">{tableName}</Typography>
                <NormalButton
                    //   sx={{
                    //     "&:hover": {
                    //       backgroundColor: theme.palette.primary.main,
                    //     },
                    //   }}
                    label={lableAddButton}
                    //   background={theme.palette.primary.main}
                    //   color={theme.palette.secondary.main}
                    onClick={() => navigateToUserProfile()}
                />
            </Stack>
        </Box>
    );
};
