import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import Image2 from "../images/image-2.png";
import MainImage from "../images/mainimage.png";

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState("Gmail AI");

  const renderContent = () => {
    switch (activeTab) {
      case "Gmail AI":
        return (
          <Card sx={{ display: "flex", p: 2, boxShadow: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={Image2}
                  alt="Gmail interface"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Gmail AI Integration
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Improve your emails with AI suggestions right inside your
                    Gmail account.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn more
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        );
      case "Video-to-text":
        return (
          <Card sx={{ display: "flex", p: 2, boxShadow: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={MainImage}
                  alt="Video to text"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Video-to-text Transcription
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Easily transcribe videos into text with our AI-powered tool.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn more
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        );
      case "AI Paraphraser":
        return (
          <Card sx={{ display: "flex", p: 2, boxShadow: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={Image2}
                  alt="AI Paraphraser"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    AI Paraphraser Tool
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Paraphrase your text easily with the power of AI.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn more
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Box maxWidth="lg" mx="auto" py={6}>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        centered
        sx={{ mb: 4 }}
      >
        <Tab label="Gmail AI" value="Gmail AI" />
        <Tab label="Video-to-text" value="Video-to-text" />
        <Tab label="AI Paraphraser" value="AI Paraphraser" />
      </Tabs>
      <Box>{renderContent()}</Box>
    </Box>
  );
};

export default ContentSection;
