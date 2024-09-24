import React from "react";
import { Link } from "react-router-dom";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa"; // Иконки соцсетей
import Header from "./Header";

export default function HeroCopyReels() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 flex flex-col justify-center">
      <Header />
      <div className="container mx-auto text-center px-6 md:px-12 py-12 md:py-24">
        {/* Логотип CopyReels */}
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-blue-600 font-bold text-5xl rounded-full p-6 bg-blue-50 shadow-md">
            CopyReels
          </h2>
        </div>

        {/* Основной заголовок */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Достигните <span className="text-blue-500">1М</span> просмотров <br />
          на рекордной скорости
        </h1>

        {/* Описание */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Мгновенно генерируйте вирусные ролики с бесконечными подписями,
          инструментами и оверлеями. Создавайте короткие видео быстро и просто.
        </p>

        {/* Кнопка призыва к действию */}
        <Link
          to="/get-started"
          className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mb-12"
        >
          Попробовать CopyReels сейчас
        </Link>

        {/* Социальные иконки */}
        <div className="flex justify-center space-x-8 mt-20">
          <FaTiktok className="w-12 h-12 p-3 text-gray-800 dark:text-white bg-white rounded-full shadow-md hover:text-blue-500 transition-colors duration-300 hover:scale-105" />
          <FaYoutube className="w-12 h-12 p-3 text-gray-800 dark:text-white bg-white rounded-full shadow-md hover:text-blue-500 transition-colors duration-300 hover:scale-105" />
          <FaInstagram className="w-12 h-12 p-3 text-gray-800 dark:text-white bg-white rounded-full shadow-md hover:text-blue-500 transition-colors duration-300 hover:scale-105" />
        </div>
      </div>

      {/* Градиентный фон */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-tl from-blue-400 to-purple-500 opacity-40 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-blue-400 to-fuchsia-600 opacity-40 blur-[150px] rounded-full"></div>
      </div>

      {/* Декоративные волны */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,32L48,64C96,96,192,160,288,186.7C384,213,480,203,576,192C672,181,768,171,864,176C960,181,1056,203,1152,224C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
