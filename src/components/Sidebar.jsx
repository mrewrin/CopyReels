import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import {
  Link as LinkIcon,
  Edit as EditIcon,
  YouTube as YouTubeIcon,
  Telegram as TelegramIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import PaymentsIcon from "@mui/icons-material/Payments";

const Sidebar = ({ onMenuItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("videoToText");

  useEffect(() => {
    if (location.pathname === "/about") {
      setActiveItem("videoToText");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMenuItemClick = (action) => {
    setActiveItem(action);
    onMenuItemClick(action);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 280,
        "& .MuiDrawer-paper": {
          border: "none",
          boxShadow: "none",
          backgroundColor: "#F4F7FA", // Основной фон, аналогичный главной странице
        },
      }}
    >
      <Box
        p={3}
        sx={{
          width: 280,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#4044e3",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              textAlign: "center",
            }}
          >
            CopyReels
          </Typography>
          <List>
            {[
              {
                text: "Видео в текст",
                icon: <LinkIcon />,
                action: "videoToText",
              },
              {
                text: "Улучшить текст",
                icon: <EditIcon />,
                action: "improveText",
              },
              { text: "YouTube", icon: <YouTubeIcon />, action: "youtube" },
              {
                text: "Подписка",
                icon: <PaymentsIcon />,
                action: "subscription",
              },
            ].map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleMenuItemClick(item.action)}
                sx={{
                  cursor: "pointer",
                  mb: 1,
                  borderRadius: "15px", // Мягкие скругления
                  padding: "12px 20px",
                  backgroundColor:
                    activeItem === item.action ? "#D6E4FF" : "transparent", // Цвет активного элемента
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#E4EBFF", // Цвет при наведении
                  },
                  "& .MuiListItemIcon-root": {
                    color: activeItem === item.action ? "#4044e3" : "#999",
                    minWidth: "40px", // Делает иконки более компактными
                  },
                }}
                selected={activeItem === item.action}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.95rem",
                      color: activeItem === item.action ? "#4044e3" : "#666",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Box
            sx={{
              backgroundColor: "#F4F7FA",
              p: 2,
              borderRadius: "15px",
              mb: 4,
              textAlign: "center",
              border: "1px solid #ECEFF1",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Freemium план
            </Typography>
            <Typography variant="body2" color="textSecondary">
              AI ограничение минут
            </Typography>
            <Typography variant="h6" sx={{ color: "#4044e3" }}>
              5 / 0.23
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(0.23 / 5) * 100}
              sx={{
                mt: 1,
                height: 8,
                borderRadius: 3,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#9b59b6",
                },
              }}
            />
          </Box>

          <Box mb={4} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Нужна помощь?
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={1}>
              <TelegramIcon
                sx={{
                  color: "#00b2ff",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
              <EmailIcon
                sx={{
                  color: "#ff6b6b",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#4F6DFF", // Гармоничный синий цвет
              color: "#fff",
              padding: "12px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              "&:hover": {
                backgroundColor: "#3b56cc", // Более насыщенный синий при наведении
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Выйти
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
