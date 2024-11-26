"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import DashedLine from "../components/DashedLine";
import DoctorScheduleSlots from "../components/DoctorScheduleSlots";
import { Doctor, fetchDoctor } from "../components/fetchDoctor";

// Styles for info boxes
const InfoBoxStyles = {
  background:
    "linear-gradient(to bottom, rgba(21,134,253,0.3), rgba(255,255,255,1) 100%)",
  width: "100%",
  p: 3,
  "& h6": {
    color: "primary.main",
  },
  "& p": {
    color: "secondary.main",
  },
};

const DoctorsProfilePage = () => {
  const { id } = useParams(); // Get the doctor ID from the route params
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // No ID, no fetch
    const fetchData = async () => {
      try {
        // If id is an array, pick the first element
        const doctorData = await fetchDoctor(Array.isArray(id) ? id[0] : id);
        setDoctor(doctorData);
      } catch (err) {
        // @ts-expect-error not require
        setError(err.message || "Failed to fetch doctor information");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box textAlign="center" my={5}>
          <CircularProgress />
          <Typography mt={2}>Loading Doctor&apos;s Profile...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" my={5}>
          <Typography color="error" variant="h5">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!doctor) return null; // Should never happen, but guard clause

  const specialties = doctor.doctorSpecialties.map(
    (ds) => ds.specialties.title
  );

  return (
    <Container>
      <Box color="secondary.main" my={5}>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Doctor&apos;s Profile Details
        </Typography>
        <Typography
          textAlign="center"
          mt={2}
          sx={{ width: "70%", margin: "10px auto" }}
          variant="h6"
        >
          Compassionate and dedicated doctor committed to delivering
          high-quality care. Proficient in diagnosis, treatment, and advocating
          for comprehensive well-being. Prioritizing patient-centered approaches
          for optimal health outcomes.
        </Typography>
      </Box>

      <Box color="secondary.main">
        <Box sx={{ my: 10, p: 3, bgcolor: "#f8f8f8" }}>
          <Stack sx={{ bgcolor: "white", p: 3 }}>
            <Stack direction="row" gap={3}>
              <Box sx={{ width: 281, height: 281, bgcolor: "#808080" }}>
                <Image
                  src={doctor.profilePhoto}
                  alt="doctor image"
                  width={281}
                  height={281}
                  style={{
                    height: "281px",
                  }}
                />
              </Box>
              <Stack flex={1}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {doctor.name}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    {doctor.designation}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={2} mt={1}>
                    <Typography
                      noWrap
                      sx={{
                        maxWidth: "45ch",
                      }}
                    >
                      Specialties in
                    </Typography>
                    <Box>
                      {specialties.map((sp) => (
                        <Chip
                          key={sp}
                          label={sp}
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                  </Stack>
                </Box>

                <DashedLine />
                <Box>
                  <Typography sx={{ my: "2px" }}>Working at</Typography>
                  <Typography>{doctor.currentWorkingPlace}</Typography>
                </Box>
                <DashedLine />
                <Box>
                  <Stack direction="row">
                    <Typography
                      fontWeight={"bold"}
                      sx={{
                        color: "#141414",
                      }}
                    >
                      Consultation Fee
                    </Typography>
                    <Stack
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography>
                        Taka : {doctor.apointmentFee} (incl. Vat)
                      </Typography>
                      <Typography>Per consultation</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              gap={3}
              justifyContent={"space-between"}
              sx={{
                my: 4,
              }}
            >
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Total Experience</Typography>
                <Typography>{doctor.experience}+ Years</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Qualification</Typography>
                <Typography>{doctor.qualification}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Average Rating</Typography>
                <Typography>{doctor.averageRating}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Contact Number</Typography>
                <Typography>{doctor.contactNumber}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <DoctorScheduleSlots id={doctor.id} />
    </Container>
  );
};

export default DoctorsProfilePage;
