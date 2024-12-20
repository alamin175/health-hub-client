import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Define a type for the doctor data
type Doctor = {
  id: string;
  name: string;
  designation: string;
  profilePhoto: string;
  address: string;
};

const TopRatedDoctor = async () => {
  const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");

  // Validate the response and fetch data
  if (!res.ok) {
    throw new Error("Failed to fetch doctors");
  }

  const { data: doctors }: { data: Doctor[] } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20,20,20,0.1)",
        clipPath: "polygon(0 25%, 100% 0, 100% 75%, 0 100%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography color="secondary.main" variant="h3" fontWeight={600}>
          Our Top Rated Doctors
        </Typography>
        <Typography
          component="p"
          mt={2}
          color="secondary.main"
          width="40%"
          margin="0 auto"
        >
          Access to expert physicians and surgeons, advanced technologies and
          top-quality surgery facilities right there.
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2} sx={{ margin: "30px auto" }}>
          {doctors.map((doctor) => (
            <Grid item md={4} key={doctor.id}>
              <Card sx={{ maxWidth: 345 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    "& img": {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      objectFit: "cover",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={`${doctor.name}'s profile photo`}
                    height="140"
                    image={doctor.profilePhoto}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    <LocationOnIcon />
                    {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: "6px",
                    pb: "25px",
                  }}
                >
                  <Button>Book Now</Button>
                  <Button
                    LinkComponent={"a"}
                    href={`http://localhost:3000/doctors/${doctor.id}`}
                    variant="outlined"
                  >
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" LinkComponent={"a"} href="/doctors">
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctor;
