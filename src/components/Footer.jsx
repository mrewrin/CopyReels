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
        background: "linear-gradient(135deg, #f7f7f7, #ffffff)", // Lighter gradient background
        color: "#333",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
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
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  AI-Powered Transcription
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  Multi-Language Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  Secure and Private
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  High Accuracy
                </Link>
              </li>
            </Box>
          </Grid>

          {/* Learning Center Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Learning Center
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0 }}>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  variant="body2"
                  color="textSecondary"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  Support
                </Link>
              </li>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "grey.400" }} />

        {/* Social Media Links */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              aria-label="Facebook"
              href="#"
              sx={{ color: "#3b5998" }}
            >
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter" href="#" sx={{ color: "#00acee" }}>
              <Twitter />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              href="#"
              sx={{ color: "#C13584" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              href="#"
              sx={{ color: "#0072b1" }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
