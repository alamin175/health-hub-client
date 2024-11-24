"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  keyframes,
  Stack,
  Typography,
} from "@mui/material";
import BaseTable from "@/components/Dashboard/BaseTable/BaseTable";
import { ISchedule } from "@/types/Schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import ScheduleModal from "../../admin/schedules/components/ScheduleModal";
import DoctorScheduleModal from "./components/DoctorScheduleModal/DoctorScheduleModal";
import {
  useDeleteDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
} from "@/redux/api/doctorSchedules";

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const query: Record<string, any> = {};

  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(19);

  query["page"] = page;
  // query["limit"] = limit;

  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading, refetch } = useGetAllDoctorSchedulesQuery({
    ...query,
  });
  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();
  console.log(data, "do");
  //@ts-ignore
  const schedules = data?.doctorSchedules?.data;
  const meta = data?.meta;

  console.log("schedules", data);

  let pageCount: number;

  // if (meta?.total) {
  //   pageCount = Math.ceil(meta.total / limit);
  // }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      console.log("update", schedule);
      return {
        sl: index + 1,
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDate),
        startTime: dayjs(schedule?.schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteDoctorSchedule(id).unwrap();
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
    { label: "Sl", key: "sl" },
    { label: "Date", key: "startDate" },
    // { label: "End Date", key: "endDate" },
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
      {/* <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} /> */}
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default Schedules;
