/* eslint-disable */
import { Box, Container } from "@mui/material";
import React from "react";
import DashedLine from "./components/DashedLine";
import ScrollCategory from "./components/ScrollCategory";
import { Doctor } from "@/types/Doctors";
import DoctorCard from "./components/DoctorCard";

// interface PropType {
//   searchParams: { specialties?: any }; // Mark `specialties` as optional
// }

// @ts-ignore
const Doctors = async ({ searchParams }) => {
  const specialtiesParam = searchParams.specialties || ""; // Empty string for "All"
  const res = await fetch(
    `http://localhost:5000/api/v1/doctor?specialties=${specialtiesParam}`
  );

  const { data } = await res.json();

  return (
    <Container>
      <DashedLine />
      <ScrollCategory specialties={specialtiesParam} />
      <Box sx={{ mt: 2, p: 3, bgcolor: "#eae8e8" }}>
        {data?.length > 0 ? (
          data.map((doctor: Doctor, index: number) => (
            <Box key={doctor.id}>
              <DoctorCard doctor={doctor} />
              {index !== data.length - 1 && <DashedLine />}
            </Box>
          ))
        ) : (
          <Box color="secondary.main">No Doctor Found With This Specialty</Box>
        )}
      </Box>
    </Container>
  );
};

export default Doctors;
