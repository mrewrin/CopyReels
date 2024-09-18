import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container, Box } from "@mui/material";
import "./App.css";
import "./output.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/AboutPage";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import EmailConfirmation from "./components/EmailConfirmation";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEmailConfirmOpen, setIsEmailConfirmOpen] = useState(false);

  // Состояние для отслеживания авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activeSection, setActiveSection] = useState("videoToText");

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openEmailConfirm = () => setIsEmailConfirmOpen(true);
  const closeEmailConfirm = () => setIsEmailConfirmOpen(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="xl">
              <Main
                openLoginModal={openLoginModal}
                openRegisterModal={openRegisterModal}
              />
              <Footer />
              {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
              {isRegisterModalOpen && (
                <RegisterModal onClose={closeRegisterModal} />
              )}
              {isEmailConfirmOpen && (
                <EmailConfirmation
                  open={isEmailConfirmOpen}
                  onClose={closeEmailConfirm}
                />
              )}
            </Container>
          }
        />

        {/* Защищённый маршрут для /about */}
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <Box display="flex">
                <Sidebar
                  onMenuItemClick={setActiveSection}
                  activeItem={activeSection}
                />
                <Box width="100%">
                  <About />
                </Box>
              </Box>
            ) : (
              <Navigate to="/" /> // Перенаправление на главную страницу, если не авторизован
            )
          }
        />

        <Route
          path="/accounts/confirm-email/:token"
          element={
            <EmailConfirmation open={true} onClose={closeEmailConfirm} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
