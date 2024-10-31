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
import Image from "next/image";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

const TopRatedDoctor = async () => {
  const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");
  const { data: doctors } = await res.json();
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
          top-quality surgery facilities righ there.
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2} sx={{ margin: "30px auto" }}>
          {doctors.map((doctor: any) => (
            <Grid item md={4} key={doctor.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={doctor.profilePhoto}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {/* <LocationOnIcon /> */}
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
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopRatedDoctor;
