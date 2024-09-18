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
  const [activeItem, setActiveItem] = useState("videoToText"); // Установили "videoToText" как активный по умолчанию

  useEffect(() => {
    // Устанавливаем активный пункт меню на основе текущего пути
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
          border: "none", // Убираем border-right
          boxShadow: "none", // Убираем тень, если она есть
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
          backgroundColor: "#f6f7fb",
          borderRadius: "20px",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
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
                  borderRadius: "20px",
                  backgroundColor:
                    activeItem === item.action ? "#e0e0e0" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  "& .MuiListItemIcon-root": {
                    color: activeItem === item.action ? "#9b59b6" : "inherit",
                  },
                }}
                selected={activeItem === item.action}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Box
            sx={{
              backgroundColor: "#f6f7fb",
              p: 2,
              borderRadius: 2,
              mb: 4,
              textAlign: "center",
              border: "1px solid #ececec", // Добавляем границу для более минималистичного стиля
            }}
          >
            <Typography variant="subtitle1">Freemium план</Typography>
            <Typography variant="body2" color="textSecondary">
              AI ограничение минут
            </Typography>
            <Typography variant="h6">5 / 0.23</Typography>
            <LinearProgress
              variant="determinate"
              value={(0.23 / 5) * 100}
              sx={{
                mt: 1,
                height: 6,
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
                }}
              />
              <EmailIcon
                sx={{
                  color: "#ff6b6b",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            color="default"
            fullWidth
            onClick={handleLogout}
            sx={{
              borderRadius: "20px", // Скругленные края
              backgroundColor: "#f6f7fb",
              color: "#333",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              },
              textTransform: "none", // Отключить верхний регистр
              padding: "10px 20px", // Добавить отступы
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
