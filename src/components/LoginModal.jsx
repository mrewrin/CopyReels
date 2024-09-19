import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Сбрасываем ошибку перед отправкой

    console.log("Attempting login with:", formData);

    fetch("http://176.124.212.138/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Response received:", response);
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received from API:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          if (typeof onLoginSuccess === "function") {
            onLoginSuccess(); // Проверка, является ли onLoginSuccess функцией
          }
          navigate("/about"); // Перенаправляем на страницу About
        } else {
          setError("Ошибка входа. Проверьте свои учетные данные.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError(error.message || "Произошла ошибка. Попробуйте еще раз.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#f9f9f9",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Привет 👋
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Введите данные, которые вы использовали при регистрации.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Электронная почта"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Пароль"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              style: { borderRadius: "8px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Запомнить меня"
            />
            <Link href="#" variant="body2" color="primary">
              Забыли пароль?
            </Link>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 3,
              borderRadius: "8px",
              padding: "12px 0",
              backgroundColor: "#7c5cff",
              "&:hover": {
                backgroundColor: "#6c4ecc",
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Войти"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
