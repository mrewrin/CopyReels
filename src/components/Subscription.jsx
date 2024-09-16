import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

export default function Subscription() {
  const plans = [
    {
      title: "Unlimited",
      price: "$24.9/month",
      description: "Unlimited transcription of videos to text.",
      details: "Billed annually at $299.",
    },
    {
      title: "Cofilm Pro+",
      price: "$16.6/month",
      description: "100,000 AI words transcription of videos to text.",
      details: "Billed annually at $199.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Subscription Plans
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Boost your productivity with Cofilm. Choose one of the most
          cost-effective solutions in the market!
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: 300,
                p: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
              }}
            >
              <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {plan.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {plan.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  gutterBottom
                >
                  {plan.details}
                </Typography>
              </CardContent>
              <Box mb={2}>
                <Button variant="contained" color="primary">
                  Subscribe
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
