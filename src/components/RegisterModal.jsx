// RegisterModal.js
import React, { useState } from "react";

function RegisterModal() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Устанавливаем isOpen в true, чтобы модальное окно открывалось сразу
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Registration successful!");
        } else {
          alert("Registration failed!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsOpen(false)}>
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
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterModal;
