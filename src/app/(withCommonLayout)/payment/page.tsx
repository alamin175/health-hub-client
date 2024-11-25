"use client";

import { useSearchParams } from "next/navigation"; // Correct hook to access searchParams
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";

const PaymentStatusPage = () => {
  const searchParams = useSearchParams(); // Access query params
  const status = searchParams.get("status"); // Retrieve the 'status' param
  console.log("status", status);

  let icon;
  let title;

  switch (status) {
    case "success":
      icon = <CheckCircleIcon sx={{ fontSize: "90px", color: "#23b93c" }} />;
      title = "Payment Successful";
      break;
    case "cancel":
      icon = <CancelIcon sx={{ fontSize: "90px", color: "#FF0000" }} />;
      title = "Payment Cancelled";
      break;
    case "failed":
      icon = <ErrorIcon sx={{ fontSize: "90px", color: "#FF0000" }} />;
      title = "Payment Failed";
      break;
    default:
      icon = null;
      title = "Unknown Status!";
  }

  return (
    <Container>
      <Box
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: 500,
          borderRadius: 2,
          boxShadow: 1,
          py: 5,
          px: 2,
          mt: { xs: 5, md: 10 },
        }}
      >
        <Stack justifyContent="center" alignItems="center">
          {icon}
          <Typography variant="h5" my={2}>
            {title}
          </Typography>
          {status === "success" && (
            <Button size="small" variant="outlined">
              <Link href="/dashboard/patient/appointments">
                Go To Dashboard
              </Link>
            </Button>
          )}
          {status !== "success" && (
            <Button size="small" variant="outlined">
              <Link href="/doctors">Book Again</Link>
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default PaymentStatusPage;
