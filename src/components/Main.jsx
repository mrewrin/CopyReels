import React, { useState } from "react";
import Header from "./Header";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import mainImage from "../images/mainimage.png";

export default function Main() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <div>
      {/* Header должен рендериться только один раз здесь */}
      <Header
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />

      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gray-50">
        <div className="flex flex-col items-start md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            CopyREELS
          </h1>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            consectetur?
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold"
              onClick={openRegisterModal}
            >
              Sign up for free &rarr;
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold"
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        </div>
        <div className="relative md:w-1/2 mt-8 md:mt-0">
          <img
            src={mainImage}
            alt="Screenshot of the application interface"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Модальные окна */}
      {isLoginModalOpen && <LoginModal onClose={closeModal} />}
      {isRegisterModalOpen && <RegisterModal onClose={closeModal} />}
    </div>
  );
}
