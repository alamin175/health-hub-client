import SimpleModal from "@/components/Shared/Modal/SimpleModal";
import FileUploader from "@/components/Ui/Forms/FileUploader";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { Children } from "react";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

const SpecialtiesModal = ({ open, setOpen }: TProps) => {
  return (
    <SimpleModal open={open} setOpen={setOpen} title="Create a new Specialist">
      <Box sx={{ padding: "10px" }}>
        <form action="">
          <Stack direction="row" gap={4}>
            <Box>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                placeholder="Enter title"
                sx={{
                  color: "secondary.dark",
                  "& label": { color: "secondary.dark" },
                }}
              />
            </Box>
            <FileUploader name="file" label="Upload File" />
          </Stack>
          <Button type="submit" sx={{ mt: "20px" }}>
            Submit
          </Button>
        </form>
      </Box>
    </SimpleModal>
  );
};

export default SpecialtiesModal;
