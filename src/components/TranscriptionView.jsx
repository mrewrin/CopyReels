// TranscriptionView.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const TranscriptionView = ({ transcription, onBack }) => {
  return (
    <Box>
      <Button variant="outlined" onClick={onBack}>
        Назад
      </Button>
      <Box mt={2}>
        <Typography variant="h5">{transcription.title}</Typography>
        <Typography variant="body1">{transcription.content}</Typography>
        {/* Вы можете добавить другие элементы оформления */}
      </Box>
    </Box>
  );
};

export default TranscriptionView;
