"use client";
import { useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import { Box, Button, Stack, Typography } from "@mui/material";

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Schedule</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Schedule
        </Button>
      </Stack>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default Schedules;
