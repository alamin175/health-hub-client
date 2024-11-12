import SimpleModal from "@/components/Shared/Modal/SimpleModal";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

const Specialties = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button>Add Specialties</Button>
        <SimpleModal />
      </Stack>
    </Box>
  );
};

export default Specialties;
