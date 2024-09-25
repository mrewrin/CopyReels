import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Footer from "./Footer";
import Faq from "./Faq";
import Header from "./Header";
import { FaRocket, FaGem, FaBolt } from "react-icons/fa"; // Иконки для выделения

// Стили для карточки с выразительным дизайном
const PricingCard = styled(Box)(({ theme }) => ({
  background: "linear-gradient(145deg, #fdfdfd, #e8e8e8)", // Светлый градиент
  borderRadius: "20px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(5),
  textAlign: "center",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  border: "2px solid transparent",
  maxWidth: "350px", // Увеличим немного ширину карточек
  margin: "0 auto",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "scale(1.08)",
    boxShadow: "0 0 35px rgba(106, 130, 251, 0.5)", // Более яркий неоновый эффект
    border: "2px solid #6A82FB",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-100%",
    left: "-100%",
    width: "300%",
    height: "300%",
    background:
      "linear-gradient(45deg, rgba(106, 130, 251, 0.15), rgba(106, 130, 251, 0))",
    transform: "rotate(45deg)",
    zIndex: -1,
    transition: "0.7s ease",
  },
  "&:hover::before": {
    top: "0",
    left: "0",
  },
}));

// Стили для текста цены
const PriceText = styled(Typography)(({ theme }) => ({
  color: "#4044e3",
  fontSize: "2.8rem", // Увеличим немного текст цены
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

// Стили для текста под ценой
const SubPriceText = styled(Typography)(({ theme }) => ({
  color: "#6c757d",
  fontSize: "1.2rem", // Сделаем текст под ценой чуть больше
  marginBottom: theme.spacing(3),
}));

// Стили для списка преимуществ
const FeatureList = styled("ul")({
  listStyle: "none",
  padding: 0,
  marginBottom: "24px",
  "& li": {
    marginBottom: "12px",
    color: "#6c757d",
    fontSize: "1.1rem", // Чуть увеличим текст преимуществ
  },
});

// Стили для кнопки с акцентом на ховере
const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#6A82FB",
  color: "#fff",
  padding: theme.spacing(2),
  borderRadius: "50px", // Округляем края кнопки
  fontWeight: "bold",
  minHeight: "56px",
  fontSize: "1.1rem", // Увеличиваем шрифт на кнопке
  transition: "background-color 0.4s ease, transform 0.3s ease",
  "&:hover": {
    backgroundColor: "#4044e3",
    transform: "scale(1.12)", // Более заметное увеличение кнопки при ховере
  },
}));

const PricingPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ marginTop: "80px" }}>
        {/* Заголовок страницы */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#4044e3",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: 5,
            paddingTop: 5,
          }}
        >
          Тарифные планы для любого пользователя
        </Typography>
        <Typography
          align="center"
          sx={{
            color: "#6c757d",
            marginBottom: 6,
            fontSize: "1.3rem",
            fontStyle: "italic",
          }}
        >
          Подберите удобный для себя тарифный план
        </Typography>

        {/* Секция с тарифными планами */}
        <Grid container spacing={10} justifyContent="center" paddingBottom={10}>
          {/* Карточка 1 */}
          <Grid item xs={12} md={4}>
            <PricingCard>
              <FaRocket
                size={50}
                style={{ color: "#6A82FB", marginBottom: "15px" }}
              />
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
              <CTAButton sx={{ fontSize: "15px" }} fullWidth>
                Выбрать Хобби
              </CTAButton>
            </PricingCard>
          </Grid>

          {/* Карточка 2 */}
          <Grid item xs={12} md={3}>
            <PricingCard
              sx={{ border: "2px solid #4044e3", transform: "scale(1.05)" }}
            >
              <FaGem
                size={50}
                style={{ color: "#4044e3", marginBottom: "15px" }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Энтузиаст
              </Typography>
              <PriceText>$27.25</PriceText>
              <SubPriceText>в месяц</SubPriceText>
              <FeatureList>
                <li>2 часа экспорта</li>
                <li>120 минут озвучки</li>
                <li>30 минут аватара</li>
                <li>300 AI изображений</li>
              </FeatureList>
              <CTAButton sx={{ fontSize: "15px" }} fullWidth>
                Выбрать Энтузиаст
              </CTAButton>
            </PricingCard>
          </Grid>

          {/* Карточка 3 */}
          <Grid item xs={12} md={4}>
            <PricingCard>
              <FaBolt
                size={50}
                style={{ color: "#f49e42", marginBottom: "15px" }}
              />
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
              <CTAButton sx={{ fontSize: "15px" }} fullWidth>
                Выбрать Профессионал
              </CTAButton>
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
