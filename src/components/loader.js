import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/theme';

export default function CircularColor({ thickness, size }) {
    return (
        <ThemeProvider theme={theme}>
            <Stack
                sx={{
                    color: 'grey.500',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                spacing={2}
                direction="row">
                <CircularProgress
                    color="primary"
                    thickness={thickness || 5}
                    size={size}
                />
            </Stack>
        </ThemeProvider>
    );
}
