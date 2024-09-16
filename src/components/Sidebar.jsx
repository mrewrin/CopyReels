import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import {
  Link as LinkIcon,
  Edit as EditIcon,
  YouTube as YouTubeIcon,
  Description as DescriptionIcon,
  Telegram as TelegramIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const Sidebar = ({ onMenuItemClick }) => {
  // Ensure onMenuItemClick is destructured from props
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Box p={3} sx={{ width: 250 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          CopyReels
        </Typography>
        <Select fullWidth variant="outlined" defaultValue="ru" sx={{ mb: 4 }}>
          <MenuItem value="ru">Русский (Ru)</MenuItem>
        </Select>
        <List>
          <ListItem button onClick={() => onMenuItemClick("videoToText")}>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Видео в текст" />
          </ListItem>
          <ListItem button onClick={() => onMenuItemClick("improveText")}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Улучшить текст" />
          </ListItem>
          <ListItem button onClick={() => onMenuItemClick("youtube")}>
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <ListItemText primary="YouTube" />
          </ListItem>
          <ListItem button onClick={() => onMenuItemClick("subscription")}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Подписка" />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Box mb={4}>
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography variant="subtitle1">Freemium план</Typography>
            <Typography variant="body2" color="textSecondary">
              AI ограничение минут
            </Typography>
            <Typography variant="h6">5 / 0.00</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <TelegramIcon color="primary" />
          <EmailIcon color="error" />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
