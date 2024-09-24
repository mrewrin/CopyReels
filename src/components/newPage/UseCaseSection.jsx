import React from "react";

export default function UseCaseSection() {
  const useCases = [
    {
      title: "Транскрибация видео",
      description:
        "Автоматически преобразуйте любое видео в текст. Идеально для создания блогов, статей или описаний видео.",
      icon: "📝", // Можете заменить на иконку из material-ui или Tailwind
    },
    {
      title: "Рерайтинг контента",
      description:
        "Создайте уникальный текст на основе транскрипции видео. Удобно для SEO и использования в социальных сетях.",
      icon: "🔄",
    },
    {
      title: "Социальные сети",
      description:
        "Создайте идеальный контент для YouTube, TikTok, Instagram и других платформ, готовый для публикации.",
      icon: "📱",
    },
    {
      title: "Мультиязычная поддержка",
      description:
        "Транскрибируйте и рерайтите видео на разных языках, включая английский, русский и многие другие.",
      icon: "🌐",
    },
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-blue-600">
          CopyReels — Все инструменты для работы с видеоконтентом.
        </h2>
        <p className="text-lg text-gray-600 mb-16">
          Независимо от вашего кейса, CopyReels предлагает лучшие решения для
          обработки коротких видеороликов.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              style={{
                border: "1px solid #E0F2FE",
                backgroundColor: "#F0F9FF", // Нежный голубой фон
              }}
            >
              <div className="flex items-center justify-center mb-6 h-16 w-16 bg-blue-100 text-4xl rounded-full mx-auto">
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                {useCase.title}
              </h3>
              <p className="text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
