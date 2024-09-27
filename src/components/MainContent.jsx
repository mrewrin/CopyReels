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
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import TranscriptionView from "./TranscriptionView";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InstagramIcon from "@mui/icons-material/Instagram";

// Utility function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

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
  const [language, setLanguage] = useState("ru");

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

  const checkTaskStatus = async (taskId, url) => {
    try {
      const apiurl = `http://176.124.212.138/api/check_task_status/${taskId}/`;
      const token = localStorage.getItem("token");
      const csrfToken = getCookie("csrftoken");
      const intervalId = setInterval(async () => {
        const response = await fetch(apiurl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === "completed") {
            clearInterval(intervalId);

            const newEntry = {
              title: `Транскрипция по (${url})`,
              url: url,
              source: "Instagram",
              date: new Date().toLocaleString(),
              content: data.Transcribation,
              rewriteContent: data.Rewriting,
              wordCount: data.Transcribation.split(" ").length,
              rewriteWordCount: data.Rewriting.split(" ").length,
            };

            handleAddToHistory(newEntry);
            setSelectedTranscription(newEntry);
            setUrl("");
            setIsLoading(false);
            setLoadingMessage("");
          } else {
            setLoadingMessage(
              `Прогресс: ${data.progress}% происходит магия, ожидайте...`
            );
          }
        } else {
          const errorData = await response.json();
          console.error("Ошибка при проверке статуса задачи:", errorData);
        }
      }, 5000); // Интервал 5 секунд
    } catch (error) {
      console.error("Ошибка при проверке статуса задачи:", error);
    }
  };

  const handleTranscription = async () => {
    if (url.trim() !== "") {
      setIsLoading(true);
      setLoadingMessage("Происходит магия, ожидайте...");

      try {
        const csrfToken = getCookie("csrftoken");
        const authToken = localStorage.getItem("token");
        const apiurl = "http://165.227.137.248/api/process_video/";

        const response = await fetch(apiurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify({
            video_url: url,
            user_info: "default_user_info",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const taskId = data.task_id;

          checkTaskStatus(taskId, url);
        } else {
          const errorData = await response.json();
          console.error("Ошибка при получении данных с сервера:", errorData);
        }
      } catch (error) {
        console.error("Ошибка транскрипции:", error);
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
        <Typography variant="body1" color="#6c757d">
          Нет записей для отображения.
        </Typography>
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
            <Typography variant="subtitle2" color="#6c757d">
              URL/Заголовок
            </Typography>
            <Typography variant="body2">{entry.title}</Typography>
          </Grid>
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <Typography variant="subtitle2" color="#6c757d">
              Источник
            </Typography>
            {entry.source === "Instagram" && (
              <InstagramIcon sx={{ color: "#E4405F", marginLeft: 1 }} />
            )}
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" color="#6c757d">
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
                  color: favorites.includes(entry) ? "#4F6DFF" : "#e0e0e0",
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
      minHeight="100vh"
      sx={{ backgroundColor: "", marginTop: 0, paddingTop: 5 }}
    >
      <Box maxWidth={900} width="100%" margin={0}>
        {!selectedTranscription && (
          <>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#4044e3", fontWeight: "bold" }}
            >
              Транскрипция видео в текст
            </Typography>
            <Typography
              marginBottom={5}
              variant="body1"
              align="center"
              color="#6c757d"
              paragraph
            >
              CopyReels лучше всего подходит для РАЗГОВОРНЫХ видео. Поддержка
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
                      borderColor: url.trim() ? "#4F6DFF" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b56cc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4F6DFF",
                    },
                  },
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
              />

              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel id="language-select-label">Язык</InputLabel>
                <Select
                  labelId="language-select-label"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  label="Язык"
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    height: 40,
                    "& .MuiSelect-select": {
                      padding: "10px",
                    },
                  }}
                >
                  <MenuItem value="ru">Русский</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleTranscription}
                disabled={!url.trim()}
                sx={{
                  borderRadius: "10px",
                  height: 40,
                  padding: "8px 35px",
                  backgroundColor: url.trim() ? "#4F6DFF" : "#4F6DFF",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "#3b56cc",
                  },
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                Транскрибировать
              </Button>
            </Box>

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
                    color: "#4F6DFF",
                    animationDuration: "550ms",
                  }}
                />
                <Typography variant="body2" color="textSecondary" mt={2}>
                  {loadingMessage}
                </Typography>
              </Box>
            )}

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
                    color: activeContent === "all" ? "#4F6DFF" : "#6c757d",
                    borderColor:
                      activeContent === "all" ? "#4F6DFF" : "#ced4da",
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
                      activeContent === "favorites" ? "#4F6DFF" : "#6c757d",
                    borderColor:
                      activeContent === "favorites" ? "#4F6DFF" : "#ced4da",
                  }}
                >
                  <FavoriteIcon
                    style={{ color: "#4F6DFF", marginRight: "10px" }}
                  />
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
                      activeContent === "instagram" ? "#4F6DFF" : "#6c757d",
                    borderColor:
                      activeContent === "instagram" ? "#4F6DFF" : "#ced4da",
                  }}
                >
                  <InstagramIcon
                    style={{ color: "#E4405F", marginRight: "10px" }}
                  />
                  Instagram
                </Button>
              </Box>

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
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={handleConfirmDelete}
              sx={{
                backgroundColor: "#4F6DFF",
                color: "#fff",
                borderRadius: "10px",
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
