import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties", {
    next: {
      revalidate: 30,
    },
  });
  const { data: specialist } = await res.json();

  return (
    <Container sx={{ my: "45px" }}>
      <Typography variant="h3" color="secondary.main" fontWeight={500}>
        Explore Treatments across specialties
      </Typography>
      <Typography color="gray">
        Find experienced doctors across all specialties
      </Typography>
      <Box>
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
          marginY="40px"
        >
          {specialist.map((data: any) => (
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                justifyItems: "center",
                padding: "40px 10px",
                backgroundColor: "rgba(245, 245, 245, 3)",
                borderRadius: "10px",
                width: "150px",
                "& img": {
                  width: "50px",
                  height: "50px",
                },
                "&:hover": {
                  border: "1px solid #0E82FD",
                  padding: "40px 10px",
                  borderRadius: "10px",
                },
              }}
              key={data.id}
            >
              <Image src={data.icon} width={100} height={50} alt={data.title} />
              <Typography color="secondary.main" fontWeight={500} mt={1}>
                {data.title}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "#0E82FD", borderColor: "#0E82FD" }}
          >
            View All
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Specialist;
