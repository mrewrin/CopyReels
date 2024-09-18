import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ openLoginModal, openRegisterModal }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff", // Бледный фон для современного вида
        color: "#000",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
            transition: "color 0.3s",
            "&:hover": {
              color: "#9b59b6", // Легкое изменение цвета при наведении
            },
          }}
        >
          CopyReels
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            component={Link}
            to="/about"
            color="inherit"
            sx={{
              borderRadius: "20px",
              padding: "8px 16px",
              textTransform: "none",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            About
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={openLoginModal}
            sx={{
              borderRadius: "20px",
              padding: "8px 16px",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Login
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={openRegisterModal}
            sx={{
              borderRadius: "20px",
              padding: "8px 16px",
              textTransform: "none",
              backgroundColor: "#9b59b6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                backgroundColor: "#8e44ad",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Register
          </Button>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {/* Drawer для мобильного меню */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, paddingTop: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <Divider />
            <ListItem button onClick={openLoginModal}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={openRegisterModal}>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
