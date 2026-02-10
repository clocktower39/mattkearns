import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Home from "./Components/Home/Home";
import { theme } from "./theme";
import About from "./Components/About/About";
import Resume from "./Components/Resume";
import NotFoundPage from "./Components/NotFoundPage";
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/web_resume" element={<Resume />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
