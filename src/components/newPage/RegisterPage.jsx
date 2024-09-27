import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Link,
  Grid,
} from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // API запрос на регистрацию
    fetch("http://165.227.137.248/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Регистрация прошла успешно!");
        } else {
          setError("Ошибка регистрации. Попробуйте еще раз.");
        }
      })
      .catch(() => setError("Произошла ошибка. Попробуйте еще раз."))
      .finally(() => setIsLoading(false));
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Левый блок с текстом */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#eff6ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <Box textAlign="center">
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e3a8a" }}
          >
            Добро пожаловать в CopyReels
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#1e40af", maxWidth: 400, mx: "auto", mt: 2 }}
          >
            Генерируйте вирусные ролики быстрее и с легкостью. Начните прямо
            сейчас!
          </Typography>
        </Box>
      </Grid>

      {/* Правый блок с формой */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 480,
            bgcolor: "#ffffff",
            borderRadius: 2,
            p: 4,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e3a8a" }}
          >
            Регистрация в CopyReels
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Имя пользователя"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                },
              }}
            />
            <TextField
              fullWidth
              label="Электронная почта"
              name="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                },
              }}
            />
            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                },
              }}
            />
            <TextField
              fullWidth
              label="Подтвердите пароль"
              name="password_confirm"
              type="password"
              margin="normal"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                },
              }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 0",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#2563eb",
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
          </form>
          <Typography sx={{ mt: 2 }} variant="body2">
            Уже есть аккаунт?{" "}
            <Link href="/login" variant="body2" sx={{ color: "#3b82f6" }}>
              Войти
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
