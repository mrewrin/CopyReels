// import React from "react";
// import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Инициализируем useNavigate

//   const handleLogout = () => {
//     // Удаляем токен из localStorage
//     localStorage.removeItem("token");

//     // Дополнительная логика сброса состояния, если необходимо (например, очистка данных пользователя)

//     // Перенаправляем пользователя на главную страницу или страницу логина
//     navigate("/");
//   };

//   return (
//     <aside className="w-1/4 bg-gray-100 p-6">
//       <div className="flex items-center mb-8">
//         <span className="ml-3 text-xl font-semibold">CopyReels</span>
//       </div>
//       <div className="mb-6">
//         <select className="w-full p-2 rounded border border-gray-300">
//           <option>Русский (Ru)</option>
//         </select>
//       </div>
//       <nav className="space-y-4 mb-5">
//         <a href="#" className="flex items-center text-gray-700">
//           <i className="fas fa-link mr-3"></i> Видео в текст
//         </a>
//         <a href="#" className="flex items-center text-gray-700">
//           <i className="fas fa-pen mr-3"></i> Улучшить текст
//         </a>
//         <a href="#" className="flex items-center text-gray-700">
//           <i className="fab fa-youtube mr-3"></i> YouTube
//         </a>
//         <a href="#" className="flex items-center text-gray-700">
//           <i className="fas fa-file-alt mr-3"></i> Подписка
//         </a>
//       </nav>
//       <div className="mt-auto">
//         <div className="bg-white p-4 rounded shadow-sm mb-4">
//           <div className="text-gray-700 mb-2">Freemium план</div>
//           <div className="text-gray-500 text-sm">AI ограничение минут</div>
//           <div className="text-gray-700 text-lg">5 / 0.00</div>
//         </div>
//         <div className="flex items-center space-x-2 mb-4">
//           <i className="fab fa-telegram text-blue-500"></i>
//           <i className="fas fa-envelope text-red-500"></i>
//         </div>
//         <button
//           className="w-full py-2 bg-gray-200 text-gray-700 rounded"
//           onClick={handleLogout} // Добавляем обработчик события
//         >
//           Выйти
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

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

const Sidebar = () => {
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
          <ListItem button>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Видео в текст" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Улучшить текст" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <ListItemText primary="YouTube" />
          </ListItem>
          <ListItem button>
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
