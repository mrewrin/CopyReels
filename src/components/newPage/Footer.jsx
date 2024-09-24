import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter } from "@mui/icons-material"; // Importing Material UI icons

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-200 to-purple-200 py-10 rounded-t-lg">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CopyReels description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">CopyReels</h2>
          <p className="text-gray-700 mt-4">
            CopyReels — платформа для автоматической транскрибации и рерайтинга
            видео-контента с использованием ИИ. Идеальное решение для ваших
            коротких видео и социальных сетей.
          </p>

          <div className="flex space-x-4 mt-4">
            <Link to="#">
              <Instagram className="text-gray-700 hover:text-blue-600" />
            </Link>
            <Link to="#">
              <Twitter className="text-gray-700 hover:text-blue-600" />
            </Link>
          </div>
        </div>

        {/* AI Workflows */}
        <div>
          <h3 className="text-lg font-bold text-blue-600">Возможности AI</h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <Link to="#">Транскрибация видео</Link>
            </li>
            <li>
              <Link to="#">Рерайтинг текста</Link>
            </li>
            <li>
              <Link to="#">Автогенерация заголовков</Link>
            </li>
            <li>
              <Link to="#">Краткие видеообзоры</Link>
            </li>
          </ul>
        </div>

        {/* Product & Legal */}
        <div>
          <h3 className="text-lg font-bold text-blue-600">
            Продукт и Политика
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <Link to="#">Цены</Link>
            </li>
            <li>
              <Link to="#">Политика возврата</Link>
            </li>
            <li>
              <Link to="#">Условия использования</Link>
            </li>
            <li>
              <Link to="#">Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-600">
        <p>&copy; 2024 CopyReels, Inc.</p>
      </div>
    </footer>
  );
}
