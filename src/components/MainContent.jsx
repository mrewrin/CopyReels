import React from "react";
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
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { Block } from "@mui/icons-material";

export default function MainContent() {
  return (
    <Box display="flex">
      {/* Сайдбар */}
      <Box
        flex="0 0 240px"
        p={2}
        sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}
      >
        {/* Ваш контент сайдбара */}
      </Box>

      {/* Основной контент */}
      <Box flexGrow={1} p={4}>
        {""}
        {/* Растягиваем контент на всю оставшуюся ширину */}
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
          <Button variant="contained" disabled>
            Транскрипция
          </Button>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            История
          </Typography>
          <Box display="flex" gap={2} mb={4} flexWrap="wrap">
            <Button variant="contained">Все</Button>
            <Button variant="contained">Saved</Button>
            <Button
              variant="contained"
              startIcon={<YouTubeIcon />}
              color="error"
            >
              YouTube
            </Button>
            <Button
              variant="contained"
              startIcon={<InstagramIcon />}
              color="secondary"
            >
              Reels
            </Button>
            <Button
              variant="contained"
              startIcon={<MusicVideoIcon />}
              color="default"
            >
              TikTok
            </Button>
            <Button variant="contained" startIcon={<DescriptionIcon />}>
              File
            </Button>
          </Box>
          {/* Блок с историей */}
          <Box
            p={2}
            sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  URL/Заголовок
                </Typography>
                <Typography variant="body2">Reel from @themartareus</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  Источник
                </Typography>
                <InstagramIcon color="secondary" />
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  Дата
                </Typography>
                <Typography variant="body2">September 13, 2024</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton>
                  <StarIcon color="disabled" />
                </IconButton>
                <IconButton>
                  <DeleteIcon color="disabled" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
