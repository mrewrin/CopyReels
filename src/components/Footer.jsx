import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Container,
  Divider,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "#333",
        pt: 8,
        pb: 4,

        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              CopyReels
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your go-to solution for transforming video into text. Harness the
              power of AI to enhance your content creation experience.
            </Typography>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Features
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0 }}>
              {[
                "AI-Powered Transcription",
                "Multi-Language Support",
                "Secure and Private",
                "High Accuracy",
              ].map((feature, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    variant="body2"
                    color="textSecondary"
                    underline="hover"
                    sx={{
                      display: "block",
                      mb: 1,
                      transition: "color 0.3s",
                      "&:hover": { color: "#6c63ff" },
                    }}
                  >
                    {feature}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Learning Center Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Learning Center
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0 }}>
              {["Tutorials", "Blog", "FAQs", "Support"].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    variant="body2"
                    color="textSecondary"
                    underline="hover"
                    sx={{
                      display: "block",
                      mb: 1,
                      transition: "color 0.3s",
                      "&:hover": { color: "#6c63ff" },
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "#e0e0e0" }} />

        {/* Social Media Links */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            {[
              { icon: <Facebook />, color: "#3b5998" },
              { icon: <Twitter />, color: "#00acee" },
              { icon: <Instagram />, color: "#C13584" },
              { icon: <LinkedIn />, color: "#0072b1" },
            ].map((social, index) => (
              <IconButton
                key={index}
                aria-label={social.name}
                href="#"
                sx={{
                  color: social.color,
                  mx: 1,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
