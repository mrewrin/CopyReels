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

  // Проверка наличия токена в localStorage при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/about"); // Перенаправляем на About, если токен найден
    }
  }, [navigate]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const closeEmailConfirm = () => setIsEmailConfirmOpen(false);

  const handleLoginSuccess = () => {
    console.log("Login successful, navigating to /about");
    setIsAuthenticated(true);
    closeLoginModal();
    navigate("/about"); // Перенаправление на About после успешного входа
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("http://176.124.212.138/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.token) {
          // Сохраняем токен в localStorage
          localStorage.setItem("token", data.token);
          handleLoginSuccess(); // Вызываем функцию для успешного логина
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

// import React, { useState } from "react";
// import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import { Container, Box } from "@mui/material";
// import "./App.css";
// import "./output.css";
// import Main from "./components/Main";
// import Footer from "./components/Footer";
// import About from "./components/AboutPage";
// import RegisterModal from "./components/RegisterModal";
// import LoginModal from "./components/LoginModal";
// import EmailConfirmation from "./components/EmailConfirmation";
// import Sidebar from "./components/Sidebar";

// const App = () => {
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
//   const [isEmailConfirmOpen, setIsEmailConfirmOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [activeSection, setActiveSection] = useState("videoToText");
//   const navigate = useNavigate();

//   const openLoginModal = () => setIsLoginModalOpen(true);
//   const closeLoginModal = () => setIsLoginModalOpen(false);
//   const openRegisterModal = () => setIsRegisterModalOpen(true);
//   const closeRegisterModal = () => setIsRegisterModalOpen(false);
//   const closeEmailConfirm = () => setIsEmailConfirmOpen(false);

//   const handleLoginSuccess = () => {
//     console.log("Login successful, navigating to /about");
//     setIsAuthenticated(true);
//     closeLoginModal();
//     navigate("/about");
//   };

//   const handleLogin = async (credentials) => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           handleLoginSuccess();
//         } else {
//           console.log("Ошибка авторизации:", data.message);
//         }
//       } else {
//         console.log("Ошибка при выполнении запроса:", response.status);
//       }
//     } catch (error) {
//       console.log("Ошибка запроса:", error);
//     }
//   };

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <Container maxWidth="xl">
//             <Main
//               openLoginModal={openLoginModal}
//               openRegisterModal={openRegisterModal}
//             />
//             <Footer />
//             {isLoginModalOpen && (
//               <LoginModal
//                 onClose={closeLoginModal}
//                 onLogin={(credentials) => handleLogin(credentials)}
//               />
//             )}
//             {isRegisterModalOpen && (
//               <RegisterModal onClose={closeRegisterModal} />
//             )}
//             {isEmailConfirmOpen && (
//               <EmailConfirmation
//                 open={isEmailConfirmOpen}
//                 onClose={closeEmailConfirm}
//               />
//             )}
//           </Container>
//         }
//       />

//       {/* Страница /about теперь доступна без авторизации */}
//       <Route
//         path="/about"
//         element={
//           <Box display="flex">
//             <Sidebar
//               onMenuItemClick={setActiveSection}
//               activeItem={activeSection}
//             />
//             <Box width="100%">
//               <About />
//             </Box>
//           </Box>
//         }
//       />

//       <Route
//         path="/accounts/confirm-email/:token"
//         element={<EmailConfirmation open={true} onClose={closeEmailConfirm} />}
//       />
//     </Routes>
//   );
// };

// export default App;
