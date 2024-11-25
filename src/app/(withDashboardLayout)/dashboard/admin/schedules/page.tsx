"use client";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import BaseTable from "@/components/Dashboard/BaseTable/BaseTable";
import {
  useDeleteScheduleMutation,
  useGetAllScheduleQuery,
} from "@/redux/api/scheduleApi";
import { ISchedule } from "@/types/Schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

interface IScheduleTable {
  sl: number;
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<IScheduleTable[]>([]); // Typed state
  const { data, isLoading, refetch } = useGetAllScheduleQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();

  // Type `data` explicitly
  const schedules: ISchedule[] | undefined = data?.schedules;

  // Process data for the table
  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => ({
      sl: index + 1,
      id: schedule?.id,
      startDate: dateFormatter(schedule.startDate),
      endDate: dateFormatter(schedule.endDate),
      startTime: dayjs(schedule?.startDate).format("hh:mm a"),
      endTime: dayjs(schedule?.endDate).format("hh:mm a"),
    }));
    setAllSchedule(updateData || []);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSchedule(id).unwrap();
      if (response?.data?.id) {
        toast.success(response?.message || "Schedule deleted successfully");
        refetch();
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        toast.error((err as { message: string }).message);
      } else {
        toast.error("Failed to delete schedule");
      }
      console.error(err);
    }
  };

  const columns = [
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    {
      label: "Action",
      key: "action",
      render: (row: IScheduleTable) => (
        <IconButton
          sx={{ color: "red" }}
          aria-label="delete"
          onClick={() => handleDelete(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Schedule</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Schedule
        </Button>
      </Stack>
      <BaseTable columns={columns} data={allSchedule} isLoading={isLoading} />
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default Schedules;
