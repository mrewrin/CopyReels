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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Состояние для сброса пароля
  const [resetEmail, setResetEmail] = useState(""); // Для сброса пароля
  const [resetSuccess, setResetSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // Состояние для открытия диалога
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // API запрос для входа
    fetch("http://161.35.83.156/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Успешный логин
          localStorage.setItem("token", data.token);
          setOpenDialog(true); // Открыть модальное окно
          setTimeout(() => {
            navigate("/about"); // Перенаправление на страницу About через 3 секунды
          }, 3000);
        } else {
          setError("Ошибка входа. Проверьте свои учетные данные.");
        }
      })
      .catch(() => setError("Произошла ошибка. Попробуйте еще раз."))
      .finally(() => setIsLoading(false));
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // API запрос для сброса пароля
    fetch("http://161.35.83.156/password_reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: resetEmail }),
    })
      .then((response) => {
        if (response.ok) {
          setResetSuccess(true);
        } else {
          setError("Не удалось отправить запрос на сброс пароля.");
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
          backgroundColor: "#f0f7ff",
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
            sx={{ color: "#4a90e2" }}
          >
            {isPasswordReset ? "Восстановление доступа" : "Вход в CopyReels"}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#6faaf5", maxWidth: 400, mx: "auto", mt: 2 }}
          >
            {isPasswordReset
              ? "Введите ваш email для восстановления доступа к аккаунту."
              : "Введите ваши данные для доступа к платформе и начните создавать свои лучшие ролики!"}
          </Typography>
        </Box>
      </Grid>

      {/* Правый блок с формой входа/восстановления пароля */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #dceefd, #f7f9ff)",
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
          {isPasswordReset ? (
            <>
              {/* Форма для восстановления пароля */}
              {resetSuccess ? (
                <Alert severity="success">
                  Проверьте вашу почту для дальнейших инструкций.
                </Alert>
              ) : (
                <form onSubmit={handlePasswordReset}>
                  <TextField
                    fullWidth
                    label="Электронная почта"
                    name="email"
                    margin="normal"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
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
                      backgroundColor: "#4a90e2",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "12px 0",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: "#357ab7",
                      },
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Восстановить пароль"
                    )}
                  </Button>
                </form>
              )}
            </>
          ) : (
            <>
              {/* Форма для входа */}
              <form onSubmit={handleSubmit}>
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
                    backgroundColor: "#4a90e2",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "12px 0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#357ab7",
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Войти"}
                </Button>
              </form>
              <Typography sx={{ mt: 2 }} variant="body2">
                Забыли пароль?{" "}
                <Link
                  onClick={() => setIsPasswordReset(true)} // Переключение на форму восстановления
                  sx={{ color: "#4a90e2", cursor: "pointer" }}
                >
                  Восстановить доступ
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Grid>

      {/* Модальное окно после успешного входа */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogContentText>
            Вход выполнен успешно! Через 3 секунды вы будете перенаправлены на
            главную страницу.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default LoginPage;
