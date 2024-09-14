import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ openLoginModal, openRegisterModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 mb-5">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <div className="text-2xl font-bold text-gray-900">Copy Reels</div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-gray-900">
            PageAbout
          </Link>
          <a className="text-gray-600 hover:text-gray-900">Текст</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Текст
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Текст
          </a>
        </nav>
        <div className="hidden md:flex space-x-4">
          {/* Используем функции для открытия модалок */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            onClick={openLoginModal} // Открываем модалку логина
          >
            Login
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-full"
            onClick={openRegisterModal} // Открываем модалку регистрации
          >
            Register
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className="fas fa-bars text-2xl text-gray-900"></i>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-4 px-4 py-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Solutions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Get Paid
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
