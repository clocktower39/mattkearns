import { createTheme } from "@mui/material/styles";

let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#79A825",
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
      fontFamily: "Arial Black",
      fontWeight: "600",
    },
    h3: {
      color: "#79a825",
      fontFamily: "Arial Black",
      fontWeight: "600",
      fontSize: "1.3rem",
    },
    h4: {
      color: "white",
      fontFamily: "Arial",
      fontWeight: "600",
    },
    h5: {
      color: "black",
      fontSize: "1.5rem",
      fontFamily: "Arial",
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
