import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import React from "react";

const Doctor = () => {
  return (
    <Container>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Box
          sx={{
            padding: "50px",
            boxShadow: 1,
            maxWidth: 600,
            width: "100%",
            p: 4,
          }}
        >
          <Box display="flex" alignItems="center" color="primary.main" gap={2}>
            <AppRegistrationIcon sx={{ fontSize: 40 }} />
            <Typography
              fontWeight={700}
              color="secondary.main"
              variant="h4"
              component="h2"
            >
              Patient Register
            </Typography>
          </Box>

          <form>
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  my: 3,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />

                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  type="number"
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />
              </Box>
              <Button fullWidth sx={{ my: 1 }}>
                Register
              </Button>
              <Typography textAlign="center" my={2}>
                Do you already have an account? Login
              </Typography>
            </Box>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Doctor;
