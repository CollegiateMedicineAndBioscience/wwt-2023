import { createTheme } from '@mui/material/styles';

const dark = createTheme({
    palette: {
        mode: 'dark',
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
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
        },
    },
});

export { dark };
