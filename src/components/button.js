import React from 'react';

import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/theme';

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

export default CustomButton;
