// import { Metadata } from "next";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DashedLine from "../components/DashedLine";
import DoctorScheduleSlots from "../components/DoctorScheduleSlots";

// Type for the doctor specialties
type Specialty = {
  title: string;
};

// Type for the doctor details
type Doctor = {
  id: string;
  name: string;
  profilePhoto: string;
  designation: string;
  currentWorkingPlace: string;
  apointmentFee: number;
  experience: number;
  qualification: string;
  averageRating: number;
  contactNumber: string;
  doctorSpecialties: { specialties: Specialty }[];
};

// Adjusted type for Next.js page component
type PageProps = {
  params: {
    id: string;
  };
};

const DoctorsProfilePage = async ({ params }: PageProps) => {
  const res = await fetch(`http://localhost:5000/api/v1/doctor/${params.id}`);
  const { data: doctor }: { data: Doctor } = await res.json();

  // Map specialties explicitly
  const specialties = doctor.doctorSpecialties.map(
    (ds: { specialties: Specialty }) => ds.specialties.title
  );

  // Optional: Generate metadata dynamically
  // export const generateMetadata = async ({
  //   params,
  // }: PageProps): Promise<Metadata> => {
  //   return {
  //     title: `Dr. ${doctor.name} - Profile`,
  //     description: `Profile of Dr. ${doctor.name}, ${
  //       doctor.designation
  //     } specializing in ${specialties.join(", ")}`,
  //   };
  // };

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
                  src={doctor?.profilePhoto}
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
                    {doctor?.name}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    {doctor?.designation}
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
                      {specialties.map((sp: string) => (
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
                  <Typography>{doctor?.currentWorkingPlace}</Typography>
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
                        Taka : {doctor?.apointmentFee} (incl. Vat)
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
                <Typography>{doctor?.experience}+ Years</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Qualification</Typography>
                <Typography>{doctor?.qualification}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Average Rating</Typography>
                <Typography>{doctor?.averageRating}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Contact Number</Typography>
                <Typography>{doctor?.contactNumber}</Typography>
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

// Note: The InfoBoxStyles is not defined in the original code.
// You'll need to define this style object or remove it if not used
