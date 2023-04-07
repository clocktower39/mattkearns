import { createTheme } from "@mui/material/styles";

let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#73D90D",
    },
  },
  typography: {
    fontFamily: "Odibee Sans, cursive",
    h1: {
      color: "white",
      fontSize: "2.1rem",
      fontFamily: "Arial Black",
      fontWeight: 600,
    },
    h2: {
      color: "white",
      fontSize: "1.8rem",
      fontFamily: "Arial Black",
      fontWeight: "600",
    },
    h3: {
      color: "#73D90D",
      fontFamily: "Arial Black",
      fontWeight: "600",
      fontSize: "1.3rem",
    },
    h4: {
      color: "black",
      fontSize: "1.5rem",
      fontFamily: "Arial",
    },
    h5: {
      color: "white",
      fontSize: "1.2rem",
      fontFamily: "Arial",
      [theme.breakpoints.down('md')]: {
        fontSize: "1.2rem"
    },
    },
    body1: {
      fontSize: "1rem",
      color: "white",
      [theme.breakpoints.down('md')]: {
        fontSize: ".9rem"
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.9rem"
  },
    },
    subtitle1: {
      fontWeight: 500
    },
    subtitle2: {
      fontSize: '.8rem',
      fontWeight: 500
    }
  },
});

export { theme };
