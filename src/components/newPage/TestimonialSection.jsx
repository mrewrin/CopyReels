import React from "react";

export default function TestimonialsCopyReels() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
      <div className="container mx-auto text-center">
        {/* Заголовок */}
        <div className="mb-12">
          <h3 className="text-blue-500 font-semibold text-lg mb-2">
            Наши основатели
          </h3>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Создано лучшими
          </h2>
        </div>

        {/* Сетка с отзывами */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Первый отзыв */}
          <div className="bg-white p-8 rounded-3xl shadow-xl transform transition duration-300 hover:scale-105">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
              После интеграции CopyReels с нашим процессом, мы значительно
              увеличили скорость создания контента и повысили качество.
            </p>
            <div className="flex items-center mb-6">
              <img
                src="https://via.placeholder.com/48"
                alt="Алексей Иванов"
                className="w-12 h-12 rounded-full shadow-md"
              />
              <div className="text-left ml-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Алексей Иванов
                </p>
                <p className="text-gray-500">Маркетолог, Видеомастер</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl shadow-md dark:bg-blue-700">
                <p className="text-2xl font-bold text-blue-600 dark:text-white">
                  14
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                  Видео транскрибировано за день
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl shadow-md dark:bg-blue-700">
                <p className="text-2xl font-bold text-blue-600 dark:text-white">
                  $100k+
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                  Дополнительный доход
                </p>
              </div>
            </div>
          </div>

          {/* Второй отзыв */}
          <div className="bg-white p-8 rounded-3xl shadow-xl transform transition duration-300 hover:scale-105">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
              CopyReels — незаменимый инструмент для обработки видео и улучшения
              контента. С ним наша работа стала быстрее и эффективнее.
            </p>
            <div className="flex items-center mb-6">
              <img
                src="https://via.placeholder.com/48"
                alt="Мария Петрова"
                className="w-12 h-12 rounded-full shadow-md"
              />
              <div className="text-left ml-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Мария Петрова
                </p>
                <p className="text-gray-500">Контент-менеджер, StreamLine</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl shadow-md dark:bg-blue-700">
                <p className="text-2xl font-bold text-blue-600 dark:text-white">
                  4x
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                  Ускорение обработки видео
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl shadow-md dark:bg-blue-700">
                <p className="text-2xl font-bold text-blue-600 dark:text-white">
                  30%
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                  Увеличение вовлеченности
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративный фон */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-tl from-blue-300 to-purple-300 opacity-40 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-blue-400 to-pink-300 opacity-40 blur-[150px] rounded-full"></div>
      </div>
    </section>
  );
}
