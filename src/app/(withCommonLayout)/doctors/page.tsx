import { Box, Container } from "@mui/material";
import React from "react";
import DashedLine from "./components/DashedLine";
import ScrollCategory from "./components/ScrollCategory";
import { Doctor } from "@/types/Doctors";
import DoctorCard from "./components/DoctorCard";

interface PropType {
  searchParams: { specialties: string };
}
const Doctors = async ({ searchParams }: PropType) => {
  const specialtiesParam = searchParams.specialties || ""; // Handle undefined specialties
  const res = await fetch(
    `http://localhost:5000/api/v1/doctor?specialties=${specialtiesParam}`
  );

  const { data } = await res.json();

  return (
    <Container>
      <DashedLine />
      <ScrollCategory specialties={specialtiesParam} />
      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        {data?.length > 0 ? (
          data.map((doctor: Doctor, index: number) => (
            <Box key={doctor.id}>
              <DoctorCard doctor={doctor} />
              {index !== data.length - 1 && <DashedLine />}
            </Box>
          ))
        ) : (
          <Box>No Doctor Found With This Specialty</Box>
        )}
      </Box>
    </Container>
  );
};

export default Doctors;
