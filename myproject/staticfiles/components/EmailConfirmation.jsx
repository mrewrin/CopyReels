import React, { useEffect } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EmailConfirmation = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { key } = useParams(); // Получаем ключ из URL

  useEffect(() => {
    // Отправляем запрос на сервер для подтверждения email при загрузке компонента
    fetch(`http://127.0.0.1:8000/accounts/confirm-email/${key}/`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Confirmation failed");
        }
        return response.json();
      })
      .then((data) => {
        // Здесь можно обработать успешное подтверждение, например, показать уведомление
        console.log("Email confirmed successfully", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [key]);

  const handleConfirm = () => {
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
