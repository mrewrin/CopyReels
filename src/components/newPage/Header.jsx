import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll"; // Импортируем Link для плавного скролла
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // Переход на главную с возможностью прокрутки к нужному разделу
  const handleScrollToSection = (section) => {
    if (location.pathname === "/") {
      // Если уже на главной, просто скроллим
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Если не на главной, переходим на главную и передаем куда скроллить
      navigate("/", { state: { scrollTo: section } });
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#f9fafb",
        color: "#1f2937",
        boxShadow: "none",
        paddingLeft: 11,
        paddingRight: 5,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "0" }}>
        {/* Логотип */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#1f2937",
            fontWeight: 700,
            fontSize: "24px",
            "&:hover": { color: "#6366f1" },
          }}
        >
          CopyReels
        </Typography>

        {/* Меню для десктопа */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* Прокрутка к преимуществам */}
          <Button
            onClick={() => handleScrollToSection("features-section")}
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            Преимущества
          </Button>

          {/* Переход на страницу цен */}
          <Button
            component={RouterLink}
            to="/price"
            onClick={() => window.scrollTo(0, 0)} // Прокрутка наверх
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            Цены
          </Button>

          {/* Прокрутка к блогу */}
          <Button
            onClick={() => handleScrollToSection("blog")}
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            Блог
          </Button>

          {/* Прокрутка к контактам */}
          <Link to="footer" spy={true} smooth={true} duration={500}>
            <Button
              sx={{
                borderRadius: "50px",
                padding: "10px 20px",
                textTransform: "none",
                color: "#1f2937",
                backgroundColor: "#f3f4f6",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                "&:hover": { backgroundColor: "#e0f2fe" },
              }}
            >
              Контакты
            </Button>
          </Link>
        </Box>

        {/* Кнопки аутентификации */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            component={RouterLink}
            to="/login"
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            Войти
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              backgroundColor: "#6366f1",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "&:hover": { backgroundColor: "#4f46e5" },
            }}
          >
            Регистрация
          </Button>
        </Box>

        {/* Меню для мобильных устройств */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer для мобильных устройств */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, padding: "16px" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {/* Преимущества */}
            <ListItem
              button
              onClick={() => handleScrollToSection("features-section")}
            >
              <ListItemText primary="Преимущества" />
            </ListItem>
            <Divider />

            {/* Контакты */}
            <ListItem button>
              <Link to="footer" spy={true} smooth={true} duration={500}>
                <ListItemText primary="Контакты" />
              </Link>
            </ListItem>
            <Divider />

            {/* Переходы на другие страницы */}
            <ListItem button component={RouterLink} to="/blog">
              <ListItemText primary="Блог" />
            </ListItem>
            <Divider />
            <ListItem button component={RouterLink} to="/login">
              <ListItemText primary="Войти" />
            </ListItem>
            <Divider />
            <ListItem button component={RouterLink} to="/register">
              <ListItemText primary="Регистрация" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
