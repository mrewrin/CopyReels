import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
import "./App.css";
import "./output.css";
import Main from "./components/Main";
import SliderPartners from "./components/SliderPartners";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import ContactUs from "./components/ContactUs";
import ContentSection from "./components/ContentSection";
import Footer from "./components/Footer";
import About from "./components/AboutPage";
import ContentTools from "./components/ContentTools";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailConfirmation from "./components/EmailConfirmation"; // Импортируем новый компонент

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEmailConfirmOpen, setIsEmailConfirmOpen] = useState(false);

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
              <SliderPartners />
              <ContentSection />
              <ContentTools />
              <Faq />
              <ContactUs />
              <Blog />
              <Footer />
              {/* Добавляем модальные окна */}
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
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <Box width="100%">
                <About />
              </Box>
            </ProtectedRoute>
          }
        />
        {/* Маршрут для подтверждения электронной почты */}
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
