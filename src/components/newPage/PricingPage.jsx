import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Footer from "./Footer";
import Faq from "./Faq";
import Header from "./Header";

// Стили для карточки с неоново-синим градиентом на границах при наведении
const PricingCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "20px", // Более округлые углы
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  textAlign: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  border: "2px solid transparent",
  maxWidth: "300px", // Делаем карточки более узкими
  margin: "0 auto", // Центрируем карточки
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 0 20px rgba(106, 130, 251, 0.5)", // Мягкий неоновый синий
    border: "2px solid #6A82FB",
  },
}));

// Стили для текста цены
const PriceText = styled(Typography)(({ theme }) => ({
  color: "#4044e3",
  fontSize: "2.5rem", // Увеличиваем шрифт для большего эффекта
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

// Стили для текста под ценой
const SubPriceText = styled(Typography)(({ theme }) => ({
  color: "#6c757d",
  fontSize: "1rem",
  marginBottom: theme.spacing(2),
}));

// Стили для списка преимуществ
const FeatureList = styled("ul")({
  listStyle: "none",
  padding: 0,
  marginBottom: "24px",
  "& li": {
    marginBottom: "8px",
    color: "#6c757d",
  },
});

// Стили для кнопки с округлыми краями и плавным ховером
const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#a4d4ff", // Нежно-голубой цвет кнопки
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "50px", // Округляем края кнопки
  fontWeight: "bold",
  transition: "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#89c2ff", // Цвет кнопки при наведении
    transform: "scale(1.05)", // Легкое увеличение кнопки при ховере
  },
}));

const PricingPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ marginTop: "100px" }}>
        {/* Заголовок страницы */}
        <Typography
          variant="h3" // Увеличиваем размер заголовка
          align="center"
          sx={{
            color: "#4044e3",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif", // Используем выразительный шрифт
            marginBottom: 5,
          }}
        >
          Тарифные планы для любого пользователя
        </Typography>
        <Typography
          align="center"
          sx={{
            color: "#6c757d",
            marginBottom: 4,
            fontSize: "1.3rem", // Чуть увеличиваем шрифт
            fontStyle: "italic", // Добавляем стиль курсив для акцента
          }}
        >
          Подберите удобный для себя тарифный план
        </Typography>

        {/* Секция с тарифными планами */}
        <Grid container spacing={4} justifyContent="center" paddingBottom={10}>
          <Grid item xs={12} md={4}>
            <PricingCard>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Хобби
              </Typography>
              <PriceText>$19</PriceText>
              <SubPriceText>в месяц</SubPriceText>
              <FeatureList>
                <li>40 минут экспорта</li>
                <li>30 минут озвучки</li>
                <li>10 минут аватара</li>
                <li>100 AI изображений</li>
              </FeatureList>
              <CTAButton fullWidth>Выбрать Хобби</CTAButton>
            </PricingCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <PricingCard sx={{ border: "2px solid #4044e3" }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Клиппер
              </Typography>
              <PriceText>$27.25</PriceText>
              <SubPriceText>в месяц</SubPriceText>
              <FeatureList>
                <li>2 часа экспорта</li>
                <li>120 минут озвучки</li>
                <li>30 минут аватара</li>
                <li>300 AI изображений</li>
              </FeatureList>
              <CTAButton fullWidth>Выбрать Клиппер</CTAButton>
            </PricingCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <PricingCard>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Профессионал
              </Typography>
              <PriceText>$55.33</PriceText>
              <SubPriceText>в месяц</SubPriceText>
              <FeatureList>
                <li>3 часа экспорта</li>
                <li>180 минут озвучки</li>
                <li>60 минут аватара</li>
                <li>500 AI изображений</li>
              </FeatureList>
              <CTAButton fullWidth>Выбрать Профессионал</CTAButton>
            </PricingCard>
          </Grid>
        </Grid>

        {/* Секция FAQ */}
        <Faq />

        <Footer />
      </Box>
    </>
  );
};

export default PricingPage;
