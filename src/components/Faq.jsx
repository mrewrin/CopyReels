import React from "react";
import FAQItem from "./FaqItem";
import { Container, Typography, Box } from "@mui/material";

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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        FAQ
      </Typography>
      {faqs.map((faq, index) => (
        <Box key={index} mb={2}>
          <FAQItem question={faq.question} answer={faq.answer} />
        </Box>
      ))}
    </Container>
  );
};

export default Faq;
