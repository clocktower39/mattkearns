import Home from "./Components/Home";
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
// import Resume from "./Components/Resume";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
      {/* <Resume /> */}
    </ThemeProvider>
  );
}

export default App;
