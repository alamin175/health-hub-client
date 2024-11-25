import SimpleModal from "@/components/Shared/Modal/SimpleModal";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import BaseInput from "@/components/Ui/Forms/BaseInput";
import FileUploader from "@/components/Ui/Forms/FileUploader";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtyApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

const SpecialtiesModal = ({ open, setOpen }: TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      if (res?.data?.id) {
        toast.success(res?.message);
        setOpen(false);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SimpleModal open={open} setOpen={setOpen} title="Create a new Specialist">
      <BaseForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <BaseInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <FileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </BaseForm>
    </SimpleModal>
  );
};

export default SpecialtiesModal;
