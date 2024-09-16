import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Проверка имени пользователя
    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    }

    // Проверка email
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Неверный формат email адреса";
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен быть не менее 8 символов";
    }

    // Проверка подтверждения пароля
    if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.password_confirm,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsConfirmationOpen(true);
        } else {
          alert("Регистрация не удалась!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Modal open={!isConfirmationOpen} onClose={onClose}>
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
            Регистрация
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Пароль"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Подтвердите пароль"
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              error={!!errors.password_confirm}
              helperText={errors.password_confirm}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Зарегистрироваться
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Модальное окно подтверждения */}
      <Modal open={isConfirmationOpen} onClose={onClose}>
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
            Проверьте вашу почту
          </Typography>
          <Typography>
            Ссылка для подтверждения отправлена на вашу почту. Пожалуйста,
            проверьте свою электронную почту, чтобы завершить процесс
            регистрации.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            fullWidth
            sx={{ mt: 2 }}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default RegisterModal;
