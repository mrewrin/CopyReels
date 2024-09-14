import React, { useState } from "react";

function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Управление состоянием для окна подтверждения

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
      newErrors.username = "Username is required";
    }

    // Проверка email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Проверка подтверждения пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsConfirmationOpen(true); // Открываем окно подтверждения
        } else {
          alert("Registration failed!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {/* Модальное окно регистрации */}
      {!isConfirmationOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={onClose}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <h2>Register</h2>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="error-message">{errors.username}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения */}
      {isConfirmationOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={onClose}>
              &times;
            </span>
            <h2>Registration Successful</h2>
            <p>
              A confirmation link has been sent to your email. Please check your
              inbox to complete the registration process.
            </p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterModal;
