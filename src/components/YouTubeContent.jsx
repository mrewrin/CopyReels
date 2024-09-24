import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteIcon from "@mui/icons-material/Delete";

const YouTubeContent = () => {
  const [url, setUrl] = useState("");
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
    <Box sx={{ p: 4 }}>
      {/* Заголовок */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 500, color: "#4044e3" }}
        >
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
                borderColor: "#4044e3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4044e3",
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4044e3",
            color: "#fff",
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#303c9a",
            },
          }}
          onClick={handleSummarize}
        >
          Резюмировать
        </Button>
      </Box>

      {/* Блоки для опций */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 7 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowForwardIcon sx={{ color: "#4044e3", mr: 1 }} />
          <Typography variant="body1" sx={{ color: "#333", fontWeight: 500 }}>
            Веб-страница и резюме YouTube
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <VideoLibraryIcon sx={{ color: "#4044e3", mr: 1 }} />
          <Typography variant="body1" sx={{ color: "#333", fontWeight: 500 }}>
            Краткое содержание видео YouTube во время просмотра
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MonetizationOnIcon sx={{ color: "#4044e3", mr: 1 }} />
          <Typography variant="body1" sx={{ color: "#333", fontWeight: 500 }}>
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
            backgroundColor: "#4044e3",
            color: "#fff",
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#303c9a",
            },
          }}
        >
          Вскоре
        </Button>
      </Box>

      {/* История */}
      <Typography variant="h6" sx={{ mb: 2, color: "#4044e3" }}>
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
                <Typography variant="body1" color="#4044e3">
                  {entry.url}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {entry.date}
                </Typography>
              </Box>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon sx={{ color: "#4044e3" }} />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default YouTubeContent;
