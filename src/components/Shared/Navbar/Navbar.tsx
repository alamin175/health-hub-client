"use client";
import { authKey } from "@/constance/authKey";
import { getUser } from "@/utils/getUser";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const user = getUser();
  console.log(user);
  const handleLogOut = () => {
    Cookies.remove(authKey);
    router.push("/login");
  };
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/">
          <Typography variant="h4" color="primary" fontWeight={600}>
            Health
            <Box component="span" color="secondary.dark" fontWeight={600}>
              Hub
            </Box>
          </Typography>
        </Link>

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
        {user?.userId ? (
          <Button onClick={handleLogOut} color="error">
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
