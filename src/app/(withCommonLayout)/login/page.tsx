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
import Link from "next/link";

const Login = () => {
  return (
    <Container>
      <Stack
        sx={{
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
              Patient Login
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
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
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
              </Box>
              <Button fullWidth sx={{ my: 1 }}>
                Login
              </Button>
              <Typography textAlign="center" my={2}>
                Don&apos;t have an account?{" "}
                <Link color="primary.main" href="/register">
                  Register
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
