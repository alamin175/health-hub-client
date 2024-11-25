"use client";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import BaseTable from "@/components/Dashboard/BaseTable/BaseTable";
import { ISchedule } from "@/types/Schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import DoctorScheduleModal from "./components/DoctorScheduleModal/DoctorScheduleModal";
import {
  useDeleteDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
} from "@/redux/api/doctorSchedules";

interface TableRow {
  sl: number;
  id: string;
  startDate: string;
  startTime: string;
  endTime: string;
}

interface QueryParams {
  page: number;
  // Add other query parameters if needed
}

interface APIResponse {
  doctorSchedules: {
    data: ISchedule[];
  };
  meta: {
    total: number;
  };
}

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [allSchedule, setAllSchedule] = useState<TableRow[]>([]);

  const query: QueryParams = {
    page,
  };

  const { data, isLoading, refetch } = useGetAllDoctorSchedulesQuery({
    ...query,
  });

  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

  const schedules = (data as APIResponse)?.doctorSchedules?.data;

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => ({
      sl: index + 1,
      id: schedule?.scheduleId,
      startDate: dateFormatter(schedule?.schedule?.startDate),
      startTime: dayjs(schedule?.schedule?.startDate).format("hh:mm a"),
      endTime: dayjs(schedule?.schedule?.endDate).format("hh:mm a"),
    }));
    setAllSchedule(updateData || []);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteDoctorSchedule(id).unwrap();
      if (response?.data?.id) {
        toast.success(response?.message || "Schedule deleted successfully");
        refetch();
      }
    } catch (error: unknown) {
      toast.error("Failed to delete schedule");
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const columns = [
    { label: "Sl", key: "sl" },
    { label: "Date", key: "startDate" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    {
      label: "Action",
      key: "action",
      render: (row: TableRow) => (
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
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default Schedules;
