import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("videoToText");
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const closeEmailConfirm = () => setIsEmailConfirmOpen(false);

  // Обработчик успешного логина
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    closeLoginModal();
    navigate("/about"); // Перенаправляем на /about после успешного входа
  };

  // Логика отправки запроса на бэкенд для авторизации
  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        // Проверяем успешность авторизации
        if (data.success) {
          handleLoginSuccess(); // вызываем функцию для успешного логина
        } else {
          console.log("Ошибка авторизации:", data.message);
        }
      } else {
        console.log("Ошибка при выполнении запроса:", response.status);
      }
    } catch (error) {
      console.log("Ошибка запроса:", error);
    }
  };

  return (
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
            {isLoginModalOpen && (
              <LoginModal
                onClose={closeLoginModal}
                onLogin={(credentials) => handleLogin(credentials)} // Передаем функцию логина
              />
            )}
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
            <Navigate to="/" /> // Если не авторизован, перенаправляем на главную
          )
        }
      />

      <Route
        path="/accounts/confirm-email/:token"
        element={<EmailConfirmation open={true} onClose={closeEmailConfirm} />}
      />
    </Routes>
  );
};

export default App;
