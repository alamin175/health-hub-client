"use client";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import BaseInput from "@/components/Ui/Forms/BaseInput";
import FileUploader from "@/components/Ui/Forms/FileUploader";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUpdateMYProfileMutation } from "@/redux/api/myProfile";
import MultipleSelectSpecialty from "../components/MultipleSelectChip";
import { Gender } from "@/types";
import BaseSelectField from "@/components/Ui/Forms/BaseSelectField";
import { useGetSpecialtiesQuery } from "@/redux/api/specialtyApi";

const ProfileUpdate = () => {
  const [ProfileUpdate] = useUpdateMYProfileMutation();
  const [loading, setLoading] = useState(false);
  const { data: specialtiesData, isLoading } = useGetSpecialtiesQuery({});
  // const specialtiesData = data?.data;
  const router = useRouter();
  const { id } = useParams();
  const [selectedSpecialty, setSelectedSpecialty] = useState([]);
  console.log(selectedSpecialty);
  const handleFormSubmit = async (values: FieldValues) => {
    setLoading(true);
    const specialty = specialtiesData?.data.map((specialtiesId: any) => ({
      specialtiesId,
      isDeleted: false,
    }));
    try {
      // values.doctor.experience = Number(values.doctor.experience);
      // values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
      // const data = modifyPayload(values);
      // const res = await ProfileUpdate(data).unwrap();
      // console.log(res);
      // if (res?.data?.id) {
      //   toast.success(res?.message);
      //   setLoading(false);
      //   router.push("/dashboard/admin/doctors");
      // }

      console.log(values);
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
            size="medium"
            name="doctor.email"
            type="email"
            label="Email"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.contactNumber"
            label="Contact Number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.address"
            label="Address"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.registrationNumber"
            label="Registration Number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.experience"
            type="number"
            label="Experience"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseSelectField
            items={Gender}
            name="doctor.gender"
            label="Gender"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.appointmentFee"
            type="number"
            label="Appointment Fee"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.qualification"
            label="Qualification"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.currentWorkingPlace"
            label="Current Working Place"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="doctor.designation"
            label="Designation"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <MultipleSelectSpecialty
            allSpecialties={specialtiesData}
            selectedIds={selectedSpecialty}
            setSelectedIds={setSelectedSpecialty}
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

export default ProfileUpdate;
