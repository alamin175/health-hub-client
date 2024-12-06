"use client";
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import BaseInput from "@/components/Ui/Forms/BaseInput";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile";
import { toast } from "sonner";

const PatientProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch current patient profile data
  const { data: profileData, isLoading: profileLoading } =
    useGetMYProfileQuery(undefined);

  const [updateMYProfile] = useUpdateMYProfileMutation();

  const defaultValues = {
    name: profileData?.data?.name || "",
    contactNumber: profileData?.data?.contactNumber || "",
    address: profileData?.data?.address || "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    setLoading(true);

    try {
      const excludedFields: Array<keyof typeof values> = [
        "email",
        "id",
        "role",
        "needPasswordChange",
        "status",
        "createdAt",
        "updatedAt",
        "isDeleted",
        "profilePhoto",
      ];

      const updatedValues = Object.fromEntries(
        Object.entries(values).filter(
          ([key]) => !excludedFields.includes(key as keyof typeof values)
        )
      );

      const updateData = {
        id: profileData?.data?.id,
        body: updatedValues,
      };

      const result = await updateMYProfile(updateData).unwrap();

      if (result?.success) {
        toast.success("Profile updated successfully");
        router.push("/dashboard/patient/profile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data?.message || "Something went wrong!");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <BaseForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
      <Box sx={{ display: "flex", my: "7px", justifyContent: "center" }}>
        <Typography variant="h4">Update Profile</Typography>
      </Box>
      <Grid container spacing={6} sx={{ width: "100%" }}>
        <Grid item md={6}>
          <BaseInput
            size="medium"
            name="name"
            label="Name"
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={6}>
          <BaseInput
            size="medium"
            name="contactNumber"
            label="Contact Number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={6}>
          <BaseInput
            size="medium"
            name="address"
            label="Address"
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <LoadingButton
        type="submit"
        loading={loading}
        loadingPosition="center"
        loadingIndicator="Updating..."
        variant="contained"
        sx={{ mt: 5, py: 2, width: "30%" }}
      >
        {loading ? "Updating" : "Update Profile"}
      </LoadingButton>
    </BaseForm>
  );
};

export default PatientProfileUpdate;
