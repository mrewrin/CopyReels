import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import TranscriptionView from "./TranscriptionView";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function MainContent() {
  const [activeContent, setActiveContent] = useState("all");
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedTranscription, setSelectedTranscription] = useState(null);
  const [url, setUrl] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

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
    if (favorites.includes(entry)) {
      const updatedFavorites = favorites.filter((item) => item !== entry);
      setFavorites(updatedFavorites);
      updateLocalStorage("favorites", updatedFavorites);
    } else {
      const updatedFavorites = [entry, ...favorites];
      setFavorites(updatedFavorites);
      updateLocalStorage("favorites", updatedFavorites);
    }
  };

  const handleOpenDialog = (entry) => {
    setDeleteEntry(entry);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteEntry(null);
  };

  const handleConfirmDelete = () => {
    handleRemoveFromHistory(deleteEntry);
    setOpenDialog(false);
    setDeleteEntry(null);
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

  const handleTranscription = async () => {
    if (url.trim() !== "") {
      setIsLoading(true);
      setLoadingMessage(
        "Происходит магия, ожидайте, это займет около 40 секунд..."
      );

      try {
        // Отправка POST-запроса на API
        const response = await fetch(
          "http://127.0.0.1:8000/api/process_video",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ video_url: url }), // Отправка URL как строки
          }
        );

        if (response.ok) {
          const data = await response.json();

          const newEntry = {
            title: `Транскрипция по (${url})`,
            url: url,
            source: "Instagram",
            date: new Date().toLocaleString(),
            content: data.Transcribation, // Используем данные от сервера
            rewriteContent: data.Rewriting,
            wordCount: data.Transcribation.split(" ").length,
            rewriteWordCount: data.Rewriting.split(" ").length,
          };

          handleAddToHistory(newEntry);
          setSelectedTranscription(newEntry);
          setUrl("");
        } else {
          console.error(
            "Ошибка при получении данных с сервера:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setIsLoading(false);
        setLoadingMessage(""); // Убираем сообщение после завершения
      }
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
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          mb: 2,
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Grid container spacing={2} alignItems="center">
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
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textSecondary">
              Источник
            </Typography>
            {entry.source === "Instagram" && (
              <InstagramIcon sx={{ color: "#E4405F", marginLeft: 1 }} />
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
                sx={{
                  color: favorites.includes(entry) ? "#9b59b6" : "#e0e0e0",
                }}
              />
            </IconButton>
            <IconButton onClick={() => handleOpenDialog(entry)}>
              <DeleteIcon sx={{ color: "#e0e0e0" }} />
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
      alignItems=""
      minHeight="100vh"
      marginTop={5}
      marginLeft={0}
    >
      <Box maxWidth={800} width="100%" margin={0}>
        {!selectedTranscription && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Транскрипция видео в текст
            </Typography>
            <Typography
              marginBottom={5}
              variant="body1"
              align="center"
              color="textSecondary"
              paragraph
            >
              Cofilm лучше всего подходит для РАЗГОВОРНЫХ видео. Поддержка
              видеоссылок Instagram, TikTok и YouTube shorts
            </Typography>
            <Box display="flex" justifyContent="center" mb={4} gap={2}>
              <TextField
                fullWidth
                placeholder="Вставьте сюда URL-адрес видео или загрузите"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                sx={{
                  borderRadius: "10px",
                  height: 40,
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    borderRadius: "10px",
                    "& fieldset": {
                      borderRadius: "10px",
                      borderColor: url.trim() ? "#9b59b6" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#8e44ad",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9b59b6",
                    },
                  },
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f4f6f8",
                }}
              />
              <Button
                variant="contained"
                onClick={handleTranscription}
                disabled={!url.trim()}
                sx={{
                  borderRadius: "10px",
                  height: 40,
                  padding: "8px 25px",
                  backgroundColor: url.trim() ? "#9b59b6" : "#e0e0e0",
                  color: url.trim() ? "#ffffff" : "#9e9e9e",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: url.trim() ? "#8e44ad" : "#e0e0e0",
                  },
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                }}
              >
                Транскрибировать
              </Button>
            </Box>

            {/* Кастомный круговой прогресс-бар */}
            {isLoading && (
              <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <CircularProgress
                  size={80}
                  thickness={4}
                  sx={{
                    color: "#9b59b6",
                    animationDuration: "550ms",
                  }}
                />
                <Typography variant="body2" color="textSecondary" mt={2}>
                  {loadingMessage}
                </Typography>
              </Box>
            )}

            {/* Кнопки и контент */}
            <Box>
              <Typography variant="h6" gutterBottom>
                История
              </Typography>
              <Box display="flex" gap={2} mb={4} flexWrap="wrap">
                <Button
                  variant="outlined"
                  onClick={() => setActiveContent("all")}
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                    backgroundColor:
                      activeContent === "all" ? "#f6f7fb" : "transparent",
                    color: activeContent === "all" ? "#9b59b6" : "#6c757d",
                    borderColor:
                      activeContent === "all" ? "#9b59b6" : "#ced4da",
                    boxShadow:
                      activeContent === "all"
                        ? "0 0 4px rgba(155, 89, 182, 0.3)"
                        : "none",
                    "&:hover": {
                      backgroundColor:
                        activeContent === "all" ? "#f6f7fb" : "#f8f9fa",
                      borderColor: "#9b59b6",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Все
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setActiveContent("favorites")}
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                    backgroundColor:
                      activeContent === "favorites" ? "#f6f7fb" : "transparent",
                    color:
                      activeContent === "favorites" ? "#9b59b6" : "#6c757d",
                    borderColor:
                      activeContent === "favorites" ? "#9b59b6" : "#ced4da",
                    boxShadow:
                      activeContent === "favorites"
                        ? "0 0 4px rgba(155, 89, 182, 0.3)"
                        : "none",
                    "&:hover": {
                      backgroundColor:
                        activeContent === "favorites" ? "#f6f7fb" : "#f8f9fa",
                      borderColor: "#9b59b6",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FavoriteIcon style={{ color: "#9b59b6" }} />
                  Избранное
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setActiveContent("instagram")}
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                    backgroundColor:
                      activeContent === "instagram" ? "#f6f7fb" : "transparent",
                    color:
                      activeContent === "instagram" ? "#9b59b6" : "#6c757d",
                    borderColor:
                      activeContent === "instagram" ? "#9b59b6" : "#ced4da",
                    boxShadow:
                      activeContent === "instagram"
                        ? "0 0 4px rgba(155, 89, 182, 0.3)"
                        : "none",
                    "&:hover": {
                      backgroundColor:
                        activeContent === "instagram" ? "#f6f7fb" : "#f8f9fa",
                      borderColor: "#9b59b6",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <InstagramIcon style={{ color: "#E4405F" }} />
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
          </>
        )}
        {selectedTranscription && (
          <TranscriptionView
            transcription={selectedTranscription}
            onBack={() => setSelectedTranscription(null)}
          />
        )}

        {/* Диалог подтверждения удаления */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              padding: 2,
              maxWidth: "400px",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            Подтвердите удаление
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ textAlign: "center", color: "#333" }}>
              Вы уверены, что хотите удалить эту запись? Это действие нельзя
              отменить.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                backgroundColor: "#e0e0e0",
                color: "#6c757d",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#d4d4d4",
                },
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={handleConfirmDelete}
              sx={{
                backgroundColor: "#9b59b6",
                color: "#fff",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#8e44ad",
                },
              }}
            >
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
