import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#dc166c',
            mainGradient:
                'linear-gradient(to bottom right,#ec7553,#f5903f,#df3c63,#e35063,#da2564,#dc166c,#e45c5c,#f18344,#dc5c5c)',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#FFFFFF',
            main: '#FFFFFF',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#000000',
        },
        // Provide every color token (light, main, dark, and contrastText) when using
        // custom colors for props in Material UI's components.
        // Then you will be able to use it like this: `<Button color="custom">`
        // (For TypeScript, you need to add module augmentation for the `custom` value)
        custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});
