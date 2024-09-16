import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ContactUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        p: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 5,
        maxWidth: "900px",
        mx: "auto",
      }}
    >
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Still have questions?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sequi?
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          color: "white",
          px: 4,
          py: 1.5,
          borderRadius: "50px",
          textTransform: "none",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          ":hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 10px 4px rgba(255, 105, 135, .3)",
          },
        }}
      >
        Contact Us
      </Button>
    </Box>
  );
};

export default ContactUs;
