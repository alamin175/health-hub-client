import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Typography, Box } from "@mui/material";

type TProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  variant?: "outlined" | "contained";
  sx?: SxProps;
};

export default function FileUploader({
  name,
  label,
  size,
  variant,
  sx,
}: TProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          onChange(file); // Update the form state with the selected file
        };

        return (
          <Box>
            <Button
              component="label"
              role={undefined}
              variant={variant}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {label || "Upload File"}
              <Input
                {...field}
                type="file"
                size={size}
                onChange={handleFileChange}
                sx={{ display: "none" }}
              />
            </Button>
            {value?.name && (
              <Typography
                variant="body2"
                sx={{ marginTop: 1, color: "text.secondary" }}
              >
                Selected File: {value.name}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}
