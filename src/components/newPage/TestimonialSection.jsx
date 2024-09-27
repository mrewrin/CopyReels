import React from "react";

export default function TestimonialsCopyReels() {
  return (
    <section
      id="blog"
      className="py-16 bg-gradient-to-b from-blue-50 to-blue-100"
    >
      <div className="container mx-auto text-center">
        {/* Заголовок */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-blue-500">
            Создано лучшими
          </h2>
        </div>

        {/* Сетка с отзывами */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Первый отзыв */}
          <div className="bg-white p-8 rounded-3xl shadow-xl transform transition duration-300 hover:scale-105">
            <p className="text-lg text-gray-700 mb-6">
              После интеграции CopyReels с нашим процессом, мы значительно
              увеличили скорость создания контента и повысили качество.
            </p>
            <div className="text-left mb-6">
              <p className="font-semibold text-gray-900">Алексей Иванов</p>
              <p className="text-gray-500">Маркетолог, Видеомастер</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-blue-600">14</p>
                <p className="text-gray-600">Видео транскрибировано за день</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-blue-600">40%</p>
                <p className="text-gray-600">Увеличение производительности</p>
              </div>
            </div>
          </div>

          {/* Второй отзыв */}
          <div className="bg-white p-8 rounded-3xl shadow-xl transform transition duration-300 hover:scale-105">
            <p className="text-lg text-gray-700 mb-6">
              CopyReels — незаменимый инструмент для обработки видео и улучшения
              контента. С ним наша работа стала быстрее и эффективнее.
            </p>
            <div className="text-left mb-6">
              <p className="font-semibold text-gray-900">Мария Петрова</p>
              <p className="text-gray-500">Контент-менеджер, StreamLine</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-blue-600">4x</p>
                <p className="text-gray-600">Ускорение обработки видео</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-blue-600">30%</p>
                <p className="text-gray-600">Увеличение вовлеченности</p>
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
