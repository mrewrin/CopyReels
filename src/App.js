import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/newPage/Home";
import LoginPage from "./components/newPage/LoginPage";
import RegisterPage from "./components/newPage/RegisterPage";
import AboutPage from "./components/AboutPage";
import PricingPage from "./components/newPage/PricingPage";

// Создаем светлую тему
const lightTheme = createTheme({
  palette: {
    mode: "light", // Устанавливаем светлую тему
  },
});

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />{" "}
      {/* CssBaseline гарантирует, что все глобальные стили установлены */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/price" element={<PricingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
