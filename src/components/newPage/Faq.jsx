import React, { useState } from "react";
import { Collapse } from "@mui/material";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Как работает CopyReels?",
      answer:
        "CopyReels использует ИИ для автоматической транскрибации и рерайтинга видео. Просто добавьте ссылку на видео, и платформа создаст новый текстовый контент на основе исходного.",
    },
    {
      question: "Нужны ли навыки редактирования видео для работы с CopyReels?",
      answer:
        "Нет, CopyReels прост в использовании и не требует специальных навыков редактирования видео. Система полностью автоматизирована для вашего удобства.",
    },
    {
      question: "Какие типы видео я могу загрузить?",
      answer:
        "Вы можете загружать видео с YouTube, TikTok, Instagram и других популярных платформ. CopyReels справляется с любыми короткими видео.",
    },
    {
      question: "Кому будет полезен CopyReels?",
      answer:
        "CopyReels полезен для всех, кто создает контент: маркетологов, блогеров, SMM-специалистов и всех, кто работает с видео и текстом.",
    },
    {
      question: "Контент, созданный CopyReels, защищён авторскими правами?",
      answer:
        "CopyReels обеспечивает уникальный контент, генерируемый на основе исходного материала, однако убедитесь, что исходный материал разрешен к использованию.",
    },
    {
      question: "Могу ли я добавлять субтитры?",
      answer:
        "Да, CopyReels автоматически генерирует субтитры, которые вы можете редактировать и использовать в своих видео.",
    },
  ];

  return (
    <section className="py-16 bg-blue-50">
      {" "}
      {/* Light background for gentle feel */}
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-center text-3xl font-semibold text-blue-600 mb-8">
          Ваши вопросы, решены.
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-white transition duration-300 ease-in-out rounded-3xl p-6 border border-gray-100 
                          ${
                            openIndex === index
                              ? "bg-blue-300"
                              : "hover:bg-blue-200"
                          }`} // Change background on hover and open
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {item.question}
                </h3>
                <span className="text-blue-500">
                  {openIndex === index ? "—" : "+"}
                </span>
              </div>
              <Collapse in={openIndex === index}>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
