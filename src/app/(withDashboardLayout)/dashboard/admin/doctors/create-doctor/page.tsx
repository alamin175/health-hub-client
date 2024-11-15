"use client";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import BaseInput from "@/components/Ui/Forms/BaseInput";
import FileUploader from "@/components/Ui/Forms/FileUploader";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton from "@mui/lab/LoadingButton";

const CreateDoctor = () => {
  const [createDoctor] = useCreateDoctorMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (values: FieldValues) => {
    setLoading(true);
    try {
      values.doctor.experience = Number(values.doctor.experience);
      values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
      const data = modifyPayload(values);
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        setLoading(false);
        router.push("/dashboard/admin/doctors");
      }
    } catch (err) {
      console.error(err);
      //@ts-ignore
      toast.error(err?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };
  return (
    <BaseForm onSubmit={handleFormSubmit}>
      <Box sx={{ display: "flex", my: "7px", justifyContent: "center" }}>
        <Typography variant="h4">Add a new doctor</Typography>
      </Box>
      <Grid container spacing={6} sx={{ width: "100%" }}>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.name"
            label="Name"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.email"
            label="Email"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="password"
            label="Password"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.contactNumber"
            label="Contact Number"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.address"
            label="Address"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.registrationNumber"
            label="Registration Number"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.experience"
            label="Experience"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.gender"
            label="Gender"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.apointmentFee"
            label="Appoinment Fee"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.qualification"
            label="Qualification"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.currentWorkingPlace"
            label="Current Working Place"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            name="doctor.designation"
            label="Designation"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <FileUploader
            name="file"
            size="medium"
            variant="outlined"
            label="Upload Doctor Image"
            sx={{ width: "100%", py: "14px" }}
          />
        </Grid>
      </Grid>
      <LoadingButton
        type="submit"
        loading={loading}
        loadingPosition="center"
        loadingIndicator="Creating..."
        variant="contained"
        sx={{ mt: 5, py: 2, width: "30%" }}
      >
        {loading ? "Creating" : "Create Doctor"}
      </LoadingButton>
    </BaseForm>
  );
};

export default CreateDoctor;
