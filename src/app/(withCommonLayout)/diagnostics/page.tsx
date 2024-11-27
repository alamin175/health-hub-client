import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import ultrasound from "../../../assets/images/ultra.jpg";
import mri from "../../../assets/images/mri-scan.jpg";
import xray from "../../../assets/images/x-ray.png";
import blood from "../../../assets/images/sugeon.jpg";

const DiagnosticsPage = () => {
  const diagnostics = [
    {
      title: "Blood Test",
      description:
        "Comprehensive analysis to monitor your overall health, cholesterol, sugar levels, and more.",
      image: "/images/sugeon.jpg", // Corrected path
    },
    {
      title: "X-Ray",
      description:
        "Accurate imaging services for detecting fractures, joint issues, and other internal problems.",
      image: "/images/x-ray.png", // Corrected path
    },
    {
      title: "MRI Scan",
      description:
        "Advanced imaging technology to provide detailed insights into your body's condition.",
      image: "/images/mri-scan.jpg", // Corrected path
    },
    {
      title: "Ultrasound",
      description:
        "Safe and reliable diagnostic services for abdominal, pregnancy, and organ examinations.",
      image: "/images/ultra.jpg", // Corrected path
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: "3rem" }}>
        <Typography variant="h3" fontWeight="bold" color="#333" gutterBottom>
          Diagnostics Services
        </Typography>
        <Typography
          variant="body1"
          color="#666"
          sx={{ maxWidth: "600px", margin: "auto" }}
        >
          Explore our range of diagnostic services designed to ensure accurate
          results and personalized care for your health needs.
        </Typography>
      </Box>

      {/* Diagnostic Categories */}
      <Grid container spacing={4}>
        {diagnostics.map((diagnostic, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 350, // Fixed height for all images
                  objectFit: "cover", // Ensures the image fills the container proportionally
                }}
                image={diagnostic.image}
                alt={diagnostic.title}
              />

              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#1976d2"
                  gutterBottom
                >
                  {diagnostic.title}
                </Typography>
                <Typography variant="body2" color="#555">
                  {diagnostic.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Form Section */}
      <Box
        sx={{
          marginTop: "4rem",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          marginX: "auto",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#333"
          sx={{ marginBottom: "1.5rem" }}
          textAlign="center"
        >
          Book a Diagnostic Test
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
            label="Select Diagnostic Test"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            sx={{ marginBottom: "1.5rem" }}
          >
            {/* <option value="">Select Test</option> */}
            {diagnostics.map((diagnostic, index) => (
              <option key={index} value={diagnostic.title}>
                {diagnostic.title}
              </option>
            ))}
          </TextField>
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
            Book Now
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default DiagnosticsPage;
