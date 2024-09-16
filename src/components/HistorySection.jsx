import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

const HistorySection = ({
  transcriptions,
  onSelectTranscription,
  onDeleteTranscription,
  onToggleFavorite,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        История
      </Typography>
      {transcriptions.length === 0 ? (
        <Typography variant="body1">Нет транскрипций.</Typography>
      ) : (
        transcriptions.map((transcription) => (
          <Box
            key={transcription.id}
            p={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              mb: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  URL/Заголовок
                </Typography>
                <Typography variant="body2">{transcription.title}</Typography>
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
                <Typography variant="body2">{transcription.date}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(transcription.id);
                  }}
                >
                  <StarIcon
                    color={transcription.isFavorite ? "primary" : "disabled"}
                  />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTranscription(transcription.id);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
};

export default HistorySection;
