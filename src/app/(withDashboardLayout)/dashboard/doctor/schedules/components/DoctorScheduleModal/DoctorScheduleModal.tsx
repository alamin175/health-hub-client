import SimpleModal from "@/components/Shared/Modal/SimpleModal";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorSchedules";
import { useGetAllScheduleQuery } from "@/redux/api/scheduleApi";
import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";
import MultipleSelectChip from "./MultipleSelectSchedule";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

const DoctorScheduleModal = ({ open, setOpen }: TProps) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).toISOString()
  );
  const query: Record<string, string> = {}; // Fixed: Typed as Record<string, string>

  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

  // Populate query with date filters
  if (!!selectedDate) {
    query["startDate"] = dayjs(selectedDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDate"] = dayjs(selectedDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }

  const { data, refetch } = useGetAllScheduleQuery(query);
  const schedules = data?.schedules;

  const [createDoctorSchedule] = useCreateDoctorScheduleMutation(); // Removed `isLoading`

  const onSubmit = async () => {
    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectedScheduleIds,
      }).unwrap(); // Use `.unwrap()` to handle errors correctly

      toast.success(res?.message || "Schedule created successfully!");
      refetch();
      setOpen(false);
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Failed to create schedule. Please try again.");
    }
  };

  return (
    <SimpleModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
      <BaseForm onSubmit={onSubmit}>
        <Grid container spacing={2} direction="column" alignItems="stretch">
          {/* DatePicker Field */}
          <Grid item sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Pick a schedule date"
                value={dayjs(selectedDate)}
                minDate={dayjs()}
                onChange={(newValue) =>
                  setSelectedDate(dayjs(newValue).toISOString())
                }
                sx={{ width: "100%" }} // Ensures it stretches to full width
              />
            </LocalizationProvider>
          </Grid>

          {/* MultipleSelectChip Field */}
          <Grid item sx={{ width: "100%" }}>
            <MultipleSelectChip
              schedules={schedules}
              selectedScheduleIds={selectedScheduleIds}
              setSelectedScheduleIds={setSelectedScheduleIds}
            />
          </Grid>
        </Grid>

        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </BaseForm>
    </SimpleModal>
  );
};

export default DoctorScheduleModal;
