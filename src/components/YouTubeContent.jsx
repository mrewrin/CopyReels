import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteIcon from "@mui/icons-material/Delete";

const YouTubeContent = () => {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("Русский (Ru)");
  const [history, setHistory] = useState([]);

  const handleSummarize = () => {
    if (!url.trim()) return;
    const newEntry = {
      url,
      date: new Date().toLocaleDateString(),
    };
    setHistory([...history, newEntry]);
    setUrl("");
  };

  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      {/* Заголовок */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, color: "#333" }}>
          Обзор YouTube с ChatGPT онлайн и бесплатно
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Создавайте краткий обзор видеороликов YouTube за считанные секунды.
        </Typography>
      </Box>

      {/* Поле ввода и кнопка резюмирования */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Вставьте сюда ссылку на видео YouTube"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            mr: 2,
            backgroundColor: "#fff",
            borderRadius: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              "& fieldset": {
                borderColor: "#ddd",
              },
              "&:hover fieldset": {
                borderColor: "#8e44ad",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8e44ad",
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6c63ff",
            color: "#fff",
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#5752d4",
            },
          }}
          onClick={handleSummarize}
        >
          Резюмировать
        </Button>
      </Box>

      {/* Блоки для опций */}
      <Box sx={{ display: "flex", justifyContent: "", mb: 7 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowForwardIcon sx={{ color: "#8e44ad", mr: 1 }} />
          <Typography
            variant="body1"
            sx={{ color: "#333", fontWeight: 500, textAlign: "center" }}
          >
            Веб-страница и резюме YouTube
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <VideoLibraryIcon sx={{ color: "#8e44ad", mr: 1 }} />
          <Typography
            variant="body1"
            sx={{ color: "#333", fontWeight: 500, textAlign: "center" }}
          >
            Краткое содержание видео YouTube во время просмотра
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MonetizationOnIcon sx={{ color: "#8e44ad", mr: 1 }} />
          <Typography
            variant="body1"
            sx={{ color: "#333", fontWeight: 500, textAlign: "center" }}
          >
            Ежедневное бесплатное использование ChatGPT
          </Typography>
        </Box>
      </Box>

      {/* Информационный блок */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",

          maxWidth: "500px",
          margin: "0 auto",
          mb: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Мгновенные видеократкие обзоры одним щелчком мыши!
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Превращайте часы контента в краткие сводки без усилий. Получайте
          ключевые идеи с нашим расширением Chrome.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6c63ff",
            color: "#fff",
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#5752d4",
            },
          }}
        >
          Вскоре
        </Button>
      </Box>

      {/* История */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        История
      </Typography>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#fff",
          borderRadius: "16px",
          borderColor: "#ddd",
        }}
      >
        {history.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            Нет истории
          </Typography>
        ) : (
          history.map((entry, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ cursor: "pointer", mb: 1 }}
            >
              <Box>
                <Typography variant="body1">{entry.url}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {entry.date}
                </Typography>
              </Box>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default YouTubeContent;
