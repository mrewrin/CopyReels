import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";

const ImproveText = () => {
  const [history, setHistory] = useState([]);
  const [selectedTextDetail, setSelectedTextDetail] = useState(null);
  const [inputText, setInputText] = useState("");

  // Функция для добавления текста в историю и перехода к детальному просмотру
  const generateText = () => {
    if (inputText.trim() === "") return;

    const newEntry = {
      text: inputText.slice(0, 50) + (inputText.length > 50 ? "..." : ""),
      fullText: inputText,
      date: new Date().toLocaleDateString(),
    };

    setHistory([...history, newEntry]);
    setSelectedTextDetail(newEntry);
    setInputText(""); // Очищаем инпут после добавления в историю
  };

  // Функция для удаления элемента из истории
  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  // Функция для открытия вида с деталями
  const handleOpen = (entry) => {
    setSelectedTextDetail(entry);
  };

  // Функция для возврата к основному виду
  const handleBack = () => {
    setSelectedTextDetail(null);
  };

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      {selectedTextDetail ? (
        // Вид с деталями
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{
                color: "#4044e3", // Используем основной синий цвет
                textTransform: "none",
                fontSize: "0.875rem",
              }}
            >
              Назад
            </Button>
          </Box>

          {/* Блок для текста */}
          <Box
            sx={{
              p: 3,
              backgroundColor: "#f9f9f9",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              mb: 3,
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedTextDetail.fullText}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="textSecondary">
                {selectedTextDetail.date}
              </Typography>
              <IconButton
                onClick={() =>
                  navigator.clipboard.writeText(selectedTextDetail.fullText)
                }
              >
                <FileCopyIcon sx={{ color: "#4044e3" }} />
              </IconButton>
            </Box>
          </Box>

          {/* Кнопки внизу */}
          <Box display="flex" justifyContent="space-between" mt={10}>
            <Button
              fullWidth
              startIcon={<FileCopyIcon />}
              sx={{
                backgroundColor: "#e0f3ff", // Светло-синий цвет
                color: "#4044e3", // Основной синий цвет
                borderRadius: "16px",
                padding: "10px 16px",
                marginRight: 1,
                "&:hover": {
                  backgroundColor: "#cce0ff",
                },
              }}
            >
              Копировать
            </Button>
            <Button
              fullWidth
              startIcon={<RefreshIcon />}
              sx={{
                backgroundColor: "#e0f3ff",
                color: "#4044e3",
                borderRadius: "16px",
                padding: "10px 16px",
                marginLeft: 1,
                "&:hover": {
                  backgroundColor: "#cce0ff",
                },
              }}
            >
              Перегенерация
            </Button>
          </Box>
        </Box>
      ) : (
        // Основной вид
        <>
          {/* Заголовок */}
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: 500, color: "#4044e3" }} // Основной синий цвет
            >
              Перефразировать или написать с нуля AI
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Пишет с нуля или перефразирует текст без плагиата.
            </Typography>
          </Box>

          {/* Поле ввода */}
          <Box sx={{ mb: 3, borderRadius: "16px", overflow: "hidden" }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Начните писать..."
              variant="outlined"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{
                backgroundColor: "#fff",
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
          </Box>

          {/* Опции */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={4}>
              {/* Кнопка генерации */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#4044e3", // Основной синий цвет
                  color: "#fff",
                  borderRadius: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#303c9a",
                  },
                }}
                onClick={generateText}
              >
                Генерировать
              </Button>
            </Grid>
          </Grid>

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
            {history.map((entry, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ cursor: "pointer", mb: 1 }}
              >
                <Box onClick={() => handleOpen(entry)} sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" color="#4044e3">
                    {entry.text}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {entry.date}
                  </Typography>
                </Box>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon sx={{ color: "#4044e3" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ImproveText;
