import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#f9fafb",
        color: "#1f2937",
        borderRadius: "0 0 20px 20px",
        boxShadow: "none",
        paddingLeft: 11,
        paddingRight: 5,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "0" }}>
        {/* Логотип слева */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#1f2937",
            fontWeight: 700,
            fontSize: "24px",
            transition: "color 0.3s",
            "&:hover": { color: "#6366f1" },
          }}
        >
          CopyReels
        </Typography>

        {/* Центрированное меню навигации для десктопа */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Link to="features-section" spy={true} smooth={true} duration={500}>
            <Button
              sx={{
                borderRadius: "50px",
                padding: "10px 20px",
                textTransform: "none",
                color: "#1f2937",
                backgroundColor: "#f3f4f6",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": { backgroundColor: "#e0f2fe" },
              }}
            >
              Преимущества
            </Button>
          </Link>

          <Button
            component={RouterLink}
            to="/price"
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            Цены
          </Button>

          <Button
            component={RouterLink}
            to="/blog"
            sx={{
              borderRadius: "50px",
              padding: "10px 20px",
              textTransform: "none",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": { backgroundColor: "#e0f2fe" },
            }}
          >
            Блог
          </Button>
          <Link to="footer" spy={true} smooth={true} duration={500}>
            <Button
              sx={{
                borderRadius: "50px",
                padding: "10px 20px",
                textTransform: "none",
                color: "#1f2937",
                backgroundColor: "#f3f4f6",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": { backgroundColor: "#e0f2fe" },
              }}
            >
              Контакты
            </Button>
          </Link>
        </Box>

        {/* Кнопки аутентификации справа */}
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
              transition: "background-color 0.3s, box-shadow 0.3s",
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
              transition: "background-color 0.3s, box-shadow 0.3s",
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
            <ListItem button>
              <Link
                to="features-section"
                spy={true}
                smooth={true}
                duration={500}
              >
                <ListItemText primary="Features" />
              </Link>
            </ListItem>
            <Divider />
            <ListItem button>
              <Link
                to="contacts-section"
                spy={true}
                smooth={true}
                duration={500}
              >
                <ListItemText primary="Контакты" />
              </Link>
            </ListItem>
            <Divider />
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
