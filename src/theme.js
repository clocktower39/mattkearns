import { createTheme  } from '@mui/material/styles';

let theme = createTheme()

theme = createTheme(theme, {
    palette: {
        primary: {
            main: '#79A825'
        },
    },
    typography: {
        fontFamily: "Odibee Sans, cursive",
        h1: {
            color: 'white',
            fontSize: '2.1rem',
            fontFamily: 'Arial',
            fontWeight: 600,
            [theme.breakpoints.up('sm')]: {
              fontSize: '3.3rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '5rem',
            },
        },
        h2: {
            color: 'white',
            fontFamily: 'Arial',
            fontWeight: '600'
        },
        h3: {
            color: '#79a825',
            fontFamily: 'Arial',
            fontWeight: '600',
            fontSize: '1.3rem',
            [theme.breakpoints.up('sm')]: {
              fontSize: '2rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '2.5rem',
            },
        },
        h4: {
            color: 'white',
            fontFamily: 'Arial',
            fontWeight: '600'
        },
        h5: {
            color: 'white',
            fontSize: '1rem',
            [theme.breakpoints.up('sm')]: {
              fontSize: '1.3rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '1.4rem',
            },
        },
    },
});

export { theme }