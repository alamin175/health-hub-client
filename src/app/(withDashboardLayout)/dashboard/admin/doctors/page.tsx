import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const DoctorPage = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Link href="/dashboard/admin/doctors/create-doctor">
          <Button variant="contained">Create Doctor</Button>
        </Link>
        <Typography variant="h4">Doctor's</Typography>
      </Stack>
    </Box>
  );
};

export default DoctorPage;
