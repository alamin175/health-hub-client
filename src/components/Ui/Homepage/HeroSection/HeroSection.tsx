import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import assets from "@/assets/index";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        marginTop: "-80px",
        gap: "40px",
      }}
    >
      <Box
        width="40%"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginTop: "70px",
          gap: "100px",
        }}
      >
        <Image src={assets.svgs.grid} alt="Grid" />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          gap="10px"
        >
          <Typography
            variant="h3"
            component="p"
            color="secondary.main"
            fontWeight={600}
          >
            Healthier Hearts
          </Typography>
          <Typography
            variant="h3"
            component="p"
            color="secondary.main"
            fontWeight={600}
          >
            Come From
          </Typography>
          <Typography
            variant="h3"
            component="p"
            color="primary.main"
            fontWeight={600}
          >
            Preventive Care
          </Typography>
          <Box my="15px">
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Inventore numquam iste dolores quae aliquid sunt eum quo dicta
              quod possimus aspernatur eaque beatae velit veritatis repellendus
              enim dolorum corporis voluptate non.
            </Typography>
          </Box>
          <Box>
            <Button sx={{ textTransform: "uppercase" }}>Make Appoinment</Button>
            <Button
              variant="outlined"
              sx={{ textTransform: "uppercase", ml: "6px" }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", direction: "row", position: "relative" }}>
        <Box sx={{ position: "absolute", top: "-20%", left: "30%" }}>
          <Image src={assets.svgs.arrow} alt="Arrow" />
        </Box>
        <Box>
          <Image
            width={300}
            height={80}
            src={assets.images.doctor1}
            alt="Doctor"
          />
        </Box>
        <Box sx={{ mt: "-50px" }}>
          <Image
            width={300}
            height={80}
            src={assets.images.doctor2}
            alt="Doctor"
          />
        </Box>
        <Box sx={{ position: "absolute", top: "70%", left: "40%" }}>
          <Image width={300} src={assets.images.doctor3} alt="Doctor" />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
