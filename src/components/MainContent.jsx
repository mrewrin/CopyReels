import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import TranscriptionView from "./TranscriptionView"; // Импортируем новый компонент

export default function MainContent() {
  const [activeContent, setActiveContent] = useState("all");
  const [history, setHistory] = useState([]); // Состояние для хранения истории
  const [favorites, setFavorites] = useState([]); // Состояние для хранения избранного
  const [selectedTranscription, setSelectedTranscription] = useState(null); // Состояние для хранения выбранной транскрипции
  const [url, setUrl] = useState(""); // Состояние для хранения URL

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setHistory(savedHistory);
    setFavorites(savedFavorites);
  }, []);

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleAddToHistory = (newEntry) => {
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    updateLocalStorage("history", updatedHistory);
  };

  const handleAddToFavorites = (entry) => {
    if (!favorites.includes(entry)) {
      const updatedFavorites = [entry, ...favorites];
      setFavorites(updatedFavorites);
      updateLocalStorage("favorites", updatedFavorites);
    }
  };

  const handleRemoveFromHistory = (entry) => {
    const updatedHistory = history.filter((item) => item !== entry);
    setHistory(updatedHistory);
    updateLocalStorage("history", updatedHistory);

    if (favorites.includes(entry)) {
      const updatedFavorites = favorites.filter((item) => item !== entry);
      setFavorites(updatedFavorites);
      updateLocalStorage("favorites", updatedFavorites);
    }
  };

  const handleTranscription = () => {
    if (url.trim() !== "") {
      const newEntry = {
        title: `Транскрипция по (${url})`,
        source: "Instagram",
        date: new Date().toLocaleString(),
        content: `Пример транскрибированного текста для: ${url}`,
      };
      handleAddToHistory(newEntry);
      setUrl("");
      setSelectedTranscription(newEntry); // Показываем транскрипцию
    }
  };

  const renderContent = () => {
    if (selectedTranscription) {
      return (
        <TranscriptionView
          transcription={selectedTranscription}
          onBack={() => setSelectedTranscription(null)}
        />
      );
    }

    const contentToRender =
      activeContent === "favorites"
        ? favorites
        : activeContent === "instagram"
        ? history.filter((entry) => entry.source === "Instagram")
        : history;

    if (contentToRender.length === 0) {
      return (
        <Typography variant="body1">Нет записей для отображения.</Typography>
      );
    }

    return contentToRender.map((entry, index) => (
      <Box
        key={index}
        p={2}
        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: 2, mb: 2 }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            onClick={() => setSelectedTranscription(entry)}
            style={{ cursor: "pointer" }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              URL/Заголовок
            </Typography>
            <Typography variant="body2">{entry.title}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" color="textSecondary">
              Источник
            </Typography>
            {entry.source === "Instagram" && (
              <InstagramIcon color="secondary" />
            )}
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" color="textSecondary">
              Дата
            </Typography>
            <Typography variant="body2">{entry.date}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton onClick={() => handleAddToFavorites(entry)}>
              <StarIcon
                color={favorites.includes(entry) ? "primary" : "disabled"}
              />
            </IconButton>
            <IconButton onClick={() => handleRemoveFromHistory(entry)}>
              <DeleteIcon color="disabled" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    ));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box maxWidth={800} width="100%">
        {/* Заголовок и ввод */}
        <Typography variant="h4" align="center" gutterBottom>
          Транскрипция видео в текст
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Cofilm лучше всего подходит для РАЗГОВОРНЫХ видео. Поддержка
          видеоссылок Instagram, TikTok и YouTube shorts
        </Typography>
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            fullWidth
            placeholder="Вставьте сюда URL-адрес видео или загрузите"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={4} gap={2}>
          <Select defaultValue="Английский" variant="outlined">
            <MenuItem value="Английский">Английский</MenuItem>
            <MenuItem value="Русский">Русский</MenuItem>
          </Select>
          <Select defaultValue="По Умолчанию" variant="outlined">
            <MenuItem value="По Умолчанию">По Умолчанию</MenuItem>
            <MenuItem value="10 слов">10 слов</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleTranscription}>
            Транскрипция
          </Button>
        </Box>

        {/* Кнопки и контент */}
        <Box>
          <Typography variant="h6" gutterBottom>
            История
          </Typography>
          <Box display="flex" gap={2} mb={4} flexWrap="wrap">
            <Button variant="contained" onClick={() => setActiveContent("all")}>
              Все
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveContent("favorites")}
            >
              Избранное
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveContent("instagram")}
            >
              Instagram
            </Button>
          </Box>

          {/* Динамический контент */}
          <Box
            p={2}
            sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
