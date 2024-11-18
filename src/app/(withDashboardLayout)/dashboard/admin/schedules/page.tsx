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

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading, refetch } = useGetAllScheduleQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();

  // @ts-ignore
  const schedules = data?.schedules;
  // @ts-ignore
  const meta = data?.meta;

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: dateFormatter(schedule.startDate),
        endDate: dateFormatter(schedule.endDate),
        startTime: dayjs(schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);
  console.log("shcedule", allSchedule);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSchedule(id).unwrap();
      if (response?.data?.id) {
        toast.success(response?.message || "Specialty deleted successfully");
        refetch();
      }
    } catch (err: any) {
      toast.error("Failed to delete specialty");
      console.error(err.message);
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
      render: (row: any) => (
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
