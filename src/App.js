import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <Router>
      <Routes>
        {/* Главная страница с ограниченной шириной */}
        <Route
          path="/"
          element={
            <div className="container mx-auto">
              <Main
                isLoginModalOpen={isLoginModalOpen}
                isRegisterModalOpen={isRegisterModalOpen}
                closeLoginModal={closeLoginModal}
                closeRegisterModal={closeRegisterModal}
              />
              <SliderPartners />
              <ContentSection />
              <ContentTools />
              <Faq />
              <ContactUs />
              <Blog />
              <Footer />
            </div>
          }
        />
        {/* About страница на полную ширину */}
        <Route
          path="/about"
          element={
            <div className="w-full">
              <About />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
