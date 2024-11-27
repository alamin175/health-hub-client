"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Button,
} from "@mui/material";

// Dummy data for medicines
const medicines = [
  {
    name: "Paracetamol",
    description: "Effective for fever and mild pain relief.",
    price: "$5.00",
  },
  {
    name: "Ibuprofen",
    description: "Relieves inflammation and reduces fever.",
    price: "$8.00",
  },
  {
    name: "Amoxicillin",
    description: "Used to treat bacterial infections.",
    price: "$12.00",
  },
  {
    name: "Vitamin C",
    description: "Boosts immunity and overall health.",
    price: "$10.00",
  },
  {
    name: "Aspirin",
    description: "Reduces pain, fever, or inflammation.",
    price: "$6.50",
  },
  {
    name: "Cetirizine",
    description: "Effective for relieving allergy symptoms.",
    price: "$4.00",
  },
  {
    name: "Metformin",
    description: "Used to control high blood sugar in diabetes patients.",
    price: "$15.00",
  },
  {
    name: "Omeprazole",
    description: "Treats acid reflux and stomach ulcers.",
    price: "$7.50",
  },
  {
    name: "Doxycycline",
    description: "Antibiotic used to treat various bacterial infections.",
    price: "$10.00",
  },
  {
    name: "Insulin",
    description: "Hormone for managing diabetes effectively.",
    price: "$30.00",
  },
  {
    name: "Hydroxychloroquine",
    description: "Used for malaria and autoimmune diseases.",
    price: "$20.00",
  },
  {
    name: "Clindamycin",
    description: "Antibiotic used to treat serious bacterial infections.",
    price: "$18.00",
  },
  {
    name: "Azithromycin",
    description: "Effective for respiratory infections and bacterial STDs.",
    price: "$14.00",
  },
  {
    name: "Levothyroxine",
    description: "Used to treat hypothyroidism by replacing thyroid hormone.",
    price: "$25.00",
  },
  {
    name: "Losartan",
    description: "Prescribed for high blood pressure and heart conditions.",
    price: "$9.00",
  },
  {
    name: "Atorvastatin",
    description: "Helps lower cholesterol and improve heart health.",
    price: "$11.00",
  },
  {
    name: "Loratadine",
    description: "Non-drowsy antihistamine for allergy relief.",
    price: "$6.00",
  },
  {
    name: "Ranitidine",
    description: "Reduces stomach acid and treats ulcers.",
    price: "$8.50",
  },
  {
    name: "Prednisone",
    description: "Steroid used to treat inflammation and allergies.",
    price: "$22.00",
  },
  {
    name: "Furosemide",
    description: "Diuretic for reducing fluid retention and blood pressure.",
    price: "$10.00",
  },
];

const MedicinePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter medicines based on search query
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="h3" fontWeight="bold" color="#333" gutterBottom>
          Medicine Store
        </Typography>
        <Typography
          variant="body1"
          color="#666"
          sx={{ maxWidth: "600px", margin: "auto" }}
        >
          Explore our wide range of medicines to support your health and
          well-being.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <TextField
          label="Search Medicines"
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: "600px",
            marginRight: "1rem",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => setSearchQuery("")}
        >
          Clear
        </Button>
      </Box>

      {/* Medicines List */}
      <Grid container spacing={4}>
        {filteredMedicines.map((medicine, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* <CardMedia
                component="img"
                sx={{
                  height: 180,
                  objectFit: "cover",
                }}
                image={medicine.image}
                alt={medicine.name}
              /> */}
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#1976d2"
                  gutterBottom
                >
                  {medicine.name}
                </Typography>
                <Typography variant="body2" color="#555" gutterBottom>
                  {medicine.description}
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#333">
                  {medicine.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results Found */}
      {filteredMedicines.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            marginTop: "3rem",
          }}
        >
          <Typography variant="h6" color="#666">
            No medicines found for your search.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MedicinePage;
