import { Box, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="primary" fontWeight={600}>
          Health
          <Box component="span" color="secondary.dark" fontWeight={600}>
            Hub
          </Box>
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ color: "secondary.main", gap: "20px" }}
        >
          <Typography variant="h6" component={Link} href="/">
            Consultation
          </Typography>
          <Typography variant="h6" component={Link} href="/about">
            Health Plans
          </Typography>
          <Typography variant="h6" component={Link} href="/contact">
            Medicine
          </Typography>
          <Typography variant="h6" component={Link} href="/visitor">
            Diagnostics
          </Typography>
          <Typography variant="h6" component={Link} href="/login">
            NGOs
          </Typography>
        </Stack>
        <Button>Login</Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
