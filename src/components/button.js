import React from 'react';

import { theme } from 'styles/theme';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';

import LoadingButton from '@mui/lab/LoadingButton';

const CustomButton = ({
    size,
    icon,
    title,
    onClick,
    color = 'primary',
    disable = false,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                endIcon={icon || null}
                size={size || 'small'}
                onClick={onClick}
                color={color}
                sx={{ borderRadius: 50 }}
                disabled={disable}>
                {title}
            </Button>
        </ThemeProvider>
    );
};

export const LoadingButtons = ({
    loading,
    title,
    onClick,
    color = 'primary',
}) => {
    return (
        <ThemeProvider theme={theme}>
            <LoadingButton
                loading={loading}
                variant="outlined"
                onClick={onClick}
                color={color}
                sx={{ borderRadius: 50 }}>
                {title}
            </LoadingButton>
        </ThemeProvider>
    );
};

export default CustomButton;
