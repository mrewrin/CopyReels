import React, { useState } from "react";

export default function MainContent() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Транскрипция видео в текст
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Cofilm лучше всего подходит для РАЗГОВОРНЫХ видео. Поддержка видеоссылок
        Instagram, TikTok и YouTube shorts
      </p>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Вставьте сюда URL-адрес видео или загрузите"
          className="w-full max-w-lg p-4 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <select className="p-2 border border-gray-300 rounded-lg">
          <option>Английский</option>
          <option>Русский</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-lg">
          <option>По Умолчанию</option>
          <option>10 слов</option>
        </select>
        <button className="p-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
          Транскрипция
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">История</h2>
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-2 bg-gray-100 rounded-lg">Все</button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">Saved</button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">
            <i className="fab fa-youtube text-red-600"></i> YouTube
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">
            <i className="fab fa-instagram text-pink-600"></i> Reels
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">
            <i className="fab fa-tiktok text-black"></i> Tik-tok
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">
            <i className="fas fa-file-alt text-gray-600"></i> File
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
              <p className="text-gray-500">URL/Заголовок</p>
              <p>Reel from @themartareus</p>
            </div>
            <div className="col-span-1">
              <p className="text-gray-500">Источник</p>
              <i className="fab fa-instagram text-pink-600"></i>
            </div>
            <div className="col-span-1">
              <p className="text-gray-500">Дата</p>
              <p>September 13, 2024</p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <i className="fas fa-star text-gray-400 cursor-pointer"></i>
              <i className="fas fa-trash-alt text-gray-400 cursor-pointer ml-4"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
