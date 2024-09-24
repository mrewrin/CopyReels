import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfiniteIcon from "@mui/icons-material/AllInclusive";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TikTokIcon from "@mui/icons-material/MusicNote";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";

const SubscriptionOptions = () => {
  const [selected, setSelected] = useState("yearly");

  return (
    <Box textAlign="center" sx={{ mt: 4, mb: 4 }}>
      {/* Блок текущего плана */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 3,
          background: "linear-gradient(135deg, #4044e3, #8e44ad)",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "500px",
          mb: 4,
          ml: 6,
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
          Текущий план
        </Typography>
        <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
          Freemium
        </Typography>
        <Typography variant="body2" sx={{ color: "#fff", mb: 3 }}>
          Истекает через: 0 дней
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Управление подпиской
        </Button>
      </Box>

      {/* Заголовок */}
      <Typography variant="h4" gutterBottom sx={{ color: "#4044e3" }}>
        Повышайте свою производительность с CopyReels
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Мы предлагаем одно из самых экономически эффективных решений на рынке!
      </Typography>

      {/* Переключение плана */}
      <Box sx={{ mb: 4 }}>
        <Button
          onClick={() => setSelected("yearly")}
          sx={{
            textTransform: "none",
            px: 4,
            py: 1,
            borderRadius: "30px",
            background:
              selected === "yearly"
                ? "linear-gradient(135deg, #4044e3, #8e44ad)"
                : "transparent",
            color: selected === "yearly" ? "#fff" : "#000",
            "&:hover": {
              background:
                selected === "yearly"
                  ? "linear-gradient(135deg, #4044e3, #8e44ad)"
                  : "transparent",
            },
          }}
        >
          Ежегодно
        </Button>
        <Button
          onClick={() => setSelected("monthly")}
          sx={{
            textTransform: "none",
            px: 4,
            py: 1,
            borderRadius: "30px",
            background:
              selected === "monthly"
                ? "linear-gradient(135deg, #4044e3, #8e44ad)"
                : "transparent",
            color: selected === "monthly" ? "#fff" : "#000",
            "&:hover": {
              background:
                selected === "monthly"
                  ? "linear-gradient(135deg, #4044e3, #8e44ad)"
                  : "transparent",
            },
          }}
        >
          Ежемесячно
        </Button>
      </Box>

      {/* Карточки подписок */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: "16px",
              textAlign: "left",
              maxWidth: "350px",
              minHeight: "600px",
              border: "2px solid #4044e3",
              backgroundColor: "rgba(240, 240, 255, 0.95)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#4044e3" }}
            >
              Unlimited
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, color: "#4044e3" }}>
              $24.9/месяц
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#6c757d" }}>
              $299 в год, счет выставляется ежегодно
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#4044e3",
                "&:hover": { backgroundColor: "#303c9a" },
              }}
            >
              Подписаться
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 2, color: "#4044e3" }}
            >
              Преимущества Unlimited
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <InfiniteIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Неограниченная транскрипция видео в текст" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfiniteIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Неограниченный AI Писатель" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfiniteIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Неограниченное резюме для YouTube" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfiniteIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Неограниченный AI для Gmail" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <YouTubeIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Длинные видео на YouTube" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InstagramIcon sx={{ color: "#E4405F" }} />
                </ListItemIcon>
                <ListItemText primary="Reels в Instagram" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TikTokIcon sx={{ color: "#E4405F" }} />
                </ListItemIcon>
                <ListItemText primary="Ссылки TikTok" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: "16px",
              textAlign: "left",
              maxWidth: "350px",
              minHeight: "600px",
              border: "2px solid #4044e3",
              backgroundColor: "rgba(240, 240, 255, 0.95)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#4044e3" }}
            >
              CopyReels Pro
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, color: "#4044e3" }}>
              $16.6/месяц
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#6c757d" }}>
              $199 в год, счет выставляется ежегодно
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#4044e3",
                "&:hover": { backgroundColor: "#303c9a" },
              }}
            >
              Подписаться
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 2, color: "#4044e3" }}
            >
              Преимущества CopyReels Pro
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="100,000 AI слов транскрипция видео в текст" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="100,000 AI слов VAI Писатель" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="100,000 AI слов резюме для YouTube" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfiniteIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Неограниченный AI для Gmail" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <YouTubeIcon sx={{ color: "#4044e3" }} />
                </ListItemIcon>
                <ListItemText primary="Длинные видео на YouTube" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InstagramIcon sx={{ color: "#E4405F" }} />
                </ListItemIcon>
                <ListItemText primary="Reels в Instagram" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TikTokIcon sx={{ color: "#E4405F" }} />
                </ListItemIcon>
                <ListItemText primary="Ссылки TikTok" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* История счетов */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4044e3" }}>
          История счетов
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Здесь вы можете просматривать и загружать все ваши предыдущие счета.
          Если вы только что сделали платеж, может потребоваться несколько
          часов, чтобы он появился в таблице ниже.
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 700, mx: "auto", mt: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#4044e3" }}>
                  ДАТА
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#4044e3" }}>
                  ИТОГО (ВКЛЮЧАЯ НАЛОГ)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#4044e3" }}>
                  ПРОСМОТР
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{/* Add table rows here if needed */}</TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Свяжитесь с нами, если у вас возникнут дополнительные вопросы.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TelegramIcon sx={{ color: "#4044e3", mr: 1 }} />
          <EmailIcon sx={{ color: "#4044e3" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionOptions;
