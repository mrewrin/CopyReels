import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextDetailView from "./TextDetailView";

const ImproveText = () => {
  const [language, setLanguage] = useState("Испанский");
  const [wordCount, setWordCount] = useState("По Умолчанию");
  const [history, setHistory] = useState([]);
  const [selectedTextDetail, setSelectedTextDetail] = useState(null);
  const [showTextDetailView, setShowTextDetailView] = useState(false);
  const [inputText, setInputText] = useState("");

  // Функция для добавления текста в историю
  const generateText = () => {
    if (inputText.trim() === "") return;

    const newEntry = {
      text: inputText.slice(0, 50) + (inputText.length > 50 ? "..." : ""),
      fullText: inputText,
      date: new Date().toLocaleDateString(),
    };
    setHistory([...history, newEntry]);
    setInputText(""); // Очищаем инпут после добавления в историю
  };

  // Функция для удаления элемента из истории
  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  // Функция для открытия вида с деталями
  const handleOpen = (entry) => {
    setSelectedTextDetail(entry);
    setShowTextDetailView(true);
  };

  // Функция для возврата к основному виду
  const handleBack = () => {
    setShowTextDetailView(false);
  };

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      {!showTextDetailView ? (
        <>
          {/* Заголовок */}
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{ mb: 1, fontWeight: 500, color: "#333" }}
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
                    borderColor: "#8e44ad",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8e44ad",
                  },
                },
              }}
            />
          </Box>

          {/* Опции */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <Select
                fullWidth
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  minWidth: "120px",
                }}
              >
                <MenuItem value="Испанский">Испанский</MenuItem>
                <MenuItem value="Английский">Английский</MenuItem>
                <MenuItem value="Французский">Французский</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  minWidth: "120px",
                }}
              >
                <MenuItem value="По Умолчанию">По Умолчанию</MenuItem>
                <MenuItem value="100 слов">100 слов</MenuItem>
                <MenuItem value="200 слов">200 слов</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#6c63ff",
                  color: "#fff",
                  borderRadius: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#5752d4",
                  },
                }}
                onClick={generateText}
              >
                Генерировать
              </Button>
            </Grid>
          </Grid>

          {/* История */}

          <Typography variant="h6" sx={{ mb: 2 }}>
            История
          </Typography>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Добавляем тень
              border: "1px solid #ddd", // Добавляем рамку
            }}
          >
            {history.map((entry, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  mb: 1,
                  p: 1,
                  borderRadius: "12px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f7f7f7", // Добавляем эффект при наведении
                  },
                }}
              >
                <Box onClick={() => handleOpen(entry)} sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">{entry.text}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {entry.date}
                  </Typography>
                </Box>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <TextDetailView textDetail={selectedTextDetail} onBack={handleBack} />
      )}
    </Box>
  );
};

export default ImproveText;
