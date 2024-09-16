// EmailConfirmation.jsx
import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmailConfirmation = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Закрываем модальное окно и перенаправляем на главную
    onClose();
    navigate("/");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Подтверждение почты
        </Typography>
        <Typography>
          Ваша почта успешно подтверждена. Теперь вы можете войти в систему.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          fullWidth
          sx={{ mt: 2 }}
        >
          Перейти на главную
        </Button>
      </Box>
    </Modal>
  );
};

export default EmailConfirmation;
