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
            fontSize: '1.1rem',
            [theme.breakpoints.up('md')]: {
              fontSize: '1.4rem',
            },
        },
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderBottomColor: "white",
                    "& input": {
                        color: "white",
                    },
                    "& label": {
                        color: "white",
                    },
                    "& label.Mui-focused": {
                        color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "white",
                        },
                    },
                    "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                    },
                    "& .MuiNativeSelect-select": {
                      color: 'white',
                    },
                    "& .MuiNativeSelect-select option": {
                      color: 'black',
                    },
                    "& .MuiSvgIcon-root": {
                      color: 'white',
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: 'white',
                    },
                    "& .MuiOutlinedInput-notchedOutline:hover": {
                      borderColor: 'white',
                    }

                }
            },

        }
    },
});

export { theme }