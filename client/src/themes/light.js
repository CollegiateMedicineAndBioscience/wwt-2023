import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5B8FB9',
        },
        dark: {
            main: '#17223B',
        },
        highlight: {
            main: '#6B778D',
        },
        transition: {
            main: '#58647A',
        },
        midtone: {
            main: '#263859',
        },
        main: {
            main: '#17223B',
        },
        text: {
            primary: '#ffffff',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
        },
    },
});

export { lightTheme };
