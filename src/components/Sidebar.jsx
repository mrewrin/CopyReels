import React from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

const Sidebar = () => {
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("token");

    // Дополнительная логика сброса состояния, если необходимо (например, очистка данных пользователя)

    // Перенаправляем пользователя на главную страницу или страницу логина
    navigate("/");
  };

  return (
    <aside className="w-1/4 bg-gray-100 p-6">
      <div className="flex items-center mb-8">
        <span className="ml-3 text-xl font-semibold">CopyReels</span>
      </div>
      <div className="mb-6">
        <select className="w-full p-2 rounded border border-gray-300">
          <option>Русский (Ru)</option>
        </select>
      </div>
      <nav className="space-y-4 mb-5">
        <a href="#" className="flex items-center text-gray-700">
          <i className="fas fa-link mr-3"></i> Видео в текст
        </a>
        <a href="#" className="flex items-center text-gray-700">
          <i className="fas fa-pen mr-3"></i> Улучшить текст
        </a>
        <a href="#" className="flex items-center text-gray-700">
          <i className="fab fa-youtube mr-3"></i> YouTube
        </a>
        <a href="#" className="flex items-center text-gray-700">
          <i className="fas fa-file-alt mr-3"></i> Подписка
        </a>
      </nav>
      <div className="mt-auto">
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <div className="text-gray-700 mb-2">Freemium план</div>
          <div className="text-gray-500 text-sm">AI ограничение минут</div>
          <div className="text-gray-700 text-lg">5 / 0.00</div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <i className="fab fa-telegram text-blue-500"></i>
          <i className="fas fa-envelope text-red-500"></i>
        </div>
        <button
          className="w-full py-2 bg-gray-200 text-gray-700 rounded"
          onClick={handleLogout} // Добавляем обработчик события
        >
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
