import React, { useState } from "react";
import Header from "./Header";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import mainImage from "../images/mainimage.png";
import { Box, Typography, Button } from "@mui/material";

export default function Main() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <Header
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />

      {/* Main Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        p={{ xs: 4, md: 8 }}
      >
        <Box
          flexDirection="column"
          alignItems="flex-start"
          flexBasis={{ md: "50%" }}
          mb={{ xs: 4, md: 0 }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            color="textPrimary"
            gutterBottom
          >
            CopyREELS
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            consectetur?
          </Typography>
          <Box
            display="flex"
            gap={2}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={openRegisterModal}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#8e44ad",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              Sign up for free &rarr;
            </Button>
            <Button
              variant="outlined"
              onClick={openLoginModal}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "textPrimary",
                borderColor: "#ccc",
                "&:hover": {
                  borderColor: "#bbb",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Box flexBasis={{ md: "50%" }} textAlign="center">
          <img
            src={mainImage}
            alt="Screenshot of the application interface"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Box>

      {/* Модальные окна */}
      {isLoginModalOpen && <LoginModal onClose={closeModal} />}
      {isRegisterModalOpen && <RegisterModal onClose={closeModal} />}
    </div>
  );
}
