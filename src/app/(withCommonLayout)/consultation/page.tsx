import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const ConsultationPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", marginBottom: "3rem" }}>
        <Typography variant="h3" fontWeight="bold" color="#333" gutterBottom>
          Book a Consultation
        </Typography>
        <Typography
          variant="body1"
          color="#666"
          sx={{ maxWidth: "600px", margin: "auto" }}
        >
          Schedule a session with our experts to discuss your health concerns
          and create a personalized plan for you.
        </Typography>
      </Box>

      {/* Consultation Form */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="#1976d2"
                sx={{ marginBottom: "1.5rem" }}
              >
                Fill Out Your Details
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  sx={{ marginBottom: "1.5rem" }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  sx={{ marginBottom: "1.5rem" }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  sx={{ marginBottom: "1.5rem" }}
                />
                <TextField
                  fullWidth
                  label="Preferred Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: "1.5rem" }}
                />
                <TextField
                  fullWidth
                  label="Message or Health Concern"
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ marginBottom: "1.5rem" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    padding: "0.8rem",
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#333"
              sx={{ marginBottom: "1.5rem" }}
            >
              Contact Our Experts
            </Typography>
            <Typography
              variant="body1"
              color="#555"
              sx={{ marginBottom: "1rem" }}
            >
              You can also reach out to us via:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  textTransform: "none",
                  padding: "0.8rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Call Us: +1 234 567 890
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{
                  textTransform: "none",
                  padding: "0.8rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Email: support@healthhub.com
              </Button>
              <Button
                variant="outlined"
                color="info"
                fullWidth
                sx={{
                  textTransform: "none",
                  padding: "0.8rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Chat With Us
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultationPage;
