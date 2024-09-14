import React from "react";
import FAQItem from "./FaqItem";

const Faq = () => {
  const faqs = [
    {
      question: "What is Cofilm?",
      answer:
        "Cofilm is your personal AI writing assistant integrated into every platform (YouTube, Gmail, etc.).",
    },
    {
      question: "Is Cofilm free?",
      answer:
        "Yes, Cofilm offers a free tier with basic features. For advanced features, there are premium plans available.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default Faq;
