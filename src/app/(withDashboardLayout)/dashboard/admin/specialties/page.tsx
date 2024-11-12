"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SpecialtiesModal from "./components/SpecialtiesModal";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={() => setIsModalOpen(true)}>Create Specialties</Button>
        <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
    </Box>
  );
};

export default SpecialtiesPage;
