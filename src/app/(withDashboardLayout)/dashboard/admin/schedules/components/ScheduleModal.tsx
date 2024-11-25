import SimpleModal from "@/components/Shared/Modal/SimpleModal";
import BaseDatePicker from "@/components/Ui/Forms/BaseDatePicker";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import BaseTimePicker from "@/components/Ui/Forms/BaseTimePicker";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    // const data = modifyPayload(values);
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    console.log(values);
    try {
      const res = await createSchedule(values).unwrap();
      if (res?.data?.length) {
        toast.success(res?.message);
        setOpen(false);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SimpleModal open={open} setOpen={setOpen} title="Create a Schedule">
      <BaseForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <BaseDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <BaseDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <BaseTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <BaseTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </BaseForm>
    </SimpleModal>
  );
};

export default ScheduleModal;
