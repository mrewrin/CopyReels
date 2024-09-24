import React from "react";

export default function StepsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Создайте качественный контент в 3 шага
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">
          Просто вставьте ссылку на видео, и CopyReels автоматически выполнит
          транскрибацию и рерайтинг.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-700 h-24 w-24 rounded-full mx-auto mb-6">
              <span className="text-4xl font-bold text-blue-600 dark:text-white">
                1
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Вставьте ссылку
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Вставьте ссылку на видео с YouTube, TikTok или любой другой
              платформы. CopyReels сразу же начнет анализ видео.
            </p>
            <img
              src="https://via.placeholder.com/150"
              alt="Step 1"
              className="w-full h-40 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Step 2 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-700 h-24 w-24 rounded-full mx-auto mb-6">
              <span className="text-4xl font-bold text-blue-600 dark:text-white">
                2
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Транскрибация и рерайтинг
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              CopyReels автоматически транскрибирует видео и создает новый
              уникальный текст, готовый для дальнейшего использования.
            </p>
            <img
              src="https://via.placeholder.com/150"
              alt="Step 2"
              className="w-full h-40 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Step 3 */}
          <div className="p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-700 h-24 w-24 rounded-full mx-auto mb-6">
              <span className="text-4xl font-bold text-blue-600 dark:text-white">
                3
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Скачайте результат
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Получите текст и рерайтинг в удобных форматах. Используйте их для
              своих блогов, соцсетей или вебсайтов.
            </p>
            <img
              src="https://via.placeholder.com/150"
              alt="Step 3"
              className="w-full h-40 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-full shadow-lg hover:bg-gradient-to-l hover:from-blue-700 hover:to-purple-700 transition duration-300">
            Создать аккаунт
          </button>
        </div>
      </div>

      {/* Декоративный фон */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-tl from-blue-300 to-purple-400 opacity-30 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-blue-400 to-pink-300 opacity-30 blur-[150px] rounded-full"></div>
      </div>
    </section>
  );
}
