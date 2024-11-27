"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const HealthPlanPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const plans = [
    {
      title: "Basic Plan",
      description:
        "Ideal for individuals. Includes routine check-ups, general consultation, and basic diagnostics.",
      price: "$19.99/month",
    },
    {
      title: "Family Plan",
      description:
        "Designed for families. Includes consultations, vaccinations, and family-wide health coverage.",
      price: "$49.99/month",
    },
    {
      title: "Premium Plan",
      description:
        "For complete care. Includes advanced diagnostics, unlimited consultations, and priority care.",
      price: "$99.99/month",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <Typography
        variant={isMobile ? "h4" : "h3"}
        fontWeight="bold"
        sx={{ marginBottom: "2rem", color: "#333" }}
      >
        Choose the Perfect Health Plan
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "3rem",
          maxWidth: "600px",
          margin: "auto",
          color: "#666",
        }}
      >
        Find the health plan that suits your needs and keeps you and your family
        healthy.
      </Typography>

      {/* Plans */}
      <Grid container spacing={4} marginTop={10} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ marginBottom: "1rem", color: "#333" }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "1.5rem",
                    color: "#555",
                    minHeight: "60px",
                  }}
                >
                  {plan.description}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ marginBottom: "1.5rem", color: "#1976d2" }}
                >
                  {plan.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HealthPlanPage;
