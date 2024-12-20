import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SendIcon from "@mui/icons-material/Send";

const TranscriptionView = ({ transcription, onBack }) => {
  // Функция для подсчета количества слов
  const countWords = (text) => {
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      p={4}
      sx={{
        backgroundColor: "#f4f6f8",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Верхняя панель с кнопкой "Назад" и URL видео */}
      <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={onBack}
          sx={{
            color: "#4044e3",
            textTransform: "none",
            fontSize: "0.875rem",
            minWidth: "auto",
            padding: "4px 8px",
          }}
        >
          Назад
        </Button>
        <TextField
          variant="outlined"
          value={transcription.url || "Video URL"}
          placeholder="Video URL"
          fullWidth
          disabled
          sx={{
            ml: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "#fff",
            },
          }}
        />
      </Box>

      {/* Блок для Транскрипта */}
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          p: 4,
          width: "100%",
          maxWidth: "1000px",
          mb: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ color: "#4044e3", mb: 2 }}>
          Транскрипт
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 2,
            mb: 2,
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
          }}
        >
          {transcription.content}
        </Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            {`${countWords(transcription.content)} слов`}
          </Typography>
          <IconButton
            onClick={() => navigator.clipboard.writeText(transcription.content)}
          >
            <FileCopyIcon sx={{ color: "#4044e3" }} />
          </IconButton>
        </Grid>
      </Box>

      {/* Блок для Рерайтинга */}
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          p: 4,
          width: "100%",
          maxWidth: "1000px",
          mb: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ color: "#4044e3", mb: 2 }}>
          Рерайтинг
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 2,
            mb: 2,
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
          }}
        >
          {transcription.rewriteContent ||
            "Текст после рерайтинга будет отображаться здесь."}
        </Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            {`${countWords(transcription.rewriteContent)} слов`}
          </Typography>
          <IconButton
            onClick={() =>
              navigator.clipboard.writeText(transcription.rewriteContent || "")
            }
          >
            <FileCopyIcon sx={{ color: "#4044e3" }} />
          </IconButton>
        </Grid>
      </Box>

      {/* Блоки "Как это работает?" и "Upgrade" */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        sx={{ width: "100%" }}
      >
        {/* Блок "Как это работает?" */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          p={2}
          sx={{
            backgroundColor: "#f5f0ff",
            borderRadius: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "#6b42ff", fontWeight: "bold" }}
          >
            🔥 Как это работает?
          </Typography>
          <Button
            variant="text"
            sx={{
              color: "#6b42ff",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Перейти
          </Button>
        </Box>

        {/* Элемент ввода с кнопкой "Upgrade" */}
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          p={1}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            fullWidth
            placeholder="Спросите меня что-нибудь об этом видео..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#f9f9f9",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#ddd",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6b42ff",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SendIcon sx={{ color: "#9e9e9e" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="text"
            sx={{
              color: "#6b42ff",
              textTransform: "none",
              ml: 2,
              display: "flex",
              alignItems: "center",
            }}
            startIcon={<RocketLaunchIcon />}
          >
            Upgrade
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TranscriptionView;
