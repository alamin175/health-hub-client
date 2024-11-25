"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import BaseForm from "@/components/Ui/Forms/BaseForm";
import BaseInput from "@/components/Ui/Forms/BaseInput";
import BaseSelectField from "@/components/Ui/Forms/BaseSelectField";
import MultipleSelectSpecialty from "../profile/components/MultipleSelectChip";
import { Gender } from "@/types";
import { useUpdateDoctorMutation } from "@/redux/api/doctorApi";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import { toast } from "sonner";
import { useGetSpecialtiesQuery } from "@/redux/api/specialtyApi";

// Define the type for specialties
type Specialty = {
  specialtiesId: string;
  isDeleted: boolean;
};

const ProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string[]>([]);
  const router = useRouter();

  // Fetch current profile data
  const { data: profileData, isLoading: profileLoading } =
    useGetMYProfileQuery(undefined);
  const {
    data: specialtiesData,
    isLoading: specialtiesLoading,
    refetch,
  } = useGetSpecialtiesQuery({});
  const [updateDoctor] = useUpdateDoctorMutation();

  useEffect(() => {
    if (profileData?.data?.doctorSpecialties) {
      const currentSpecialties = profileData.data.doctorSpecialties.map(
        (specialty: { specialtiesId: string }) => specialty.specialtiesId
      );
      setSelectedSpecialty(currentSpecialties);
    }
  }, [profileData]);

  const defaultValues = {
    name: profileData?.data?.name || "",
    email: profileData?.data?.email || "",
    contactNumber: profileData?.data?.contactNumber || "",
    address: profileData?.data?.address || "",
    registrationNumber: profileData?.data?.registrationNumber || "",
    experience: profileData?.data?.experience || "",
    gender: profileData?.data?.gender || "",
    apointmentFee: profileData?.data?.apointmentFee || "",
    qualification: profileData?.data?.qualification || "",
    currentWorkingPlace: profileData?.data?.currentWorkingPlace || "",
    designation: profileData?.data?.designation || "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    setLoading(true);

    try {
      const specialties: Specialty[] = selectedSpecialty.map(
        (specialtiesId) => ({
          specialtiesId,
          isDeleted: false,
        })
      );

      const excludedFields: Array<keyof typeof values> = [
        "email",
        "id",
        "role",
        "needPasswordChange",
        "status",
        "createdAt",
        "updatedAt",
        "isDeleted",
        "averageRating",
        "review",
        "profilePhoto",
        "registrationNumber",
        "schedules",
        "doctorSpecialties",
      ];

      const updatedValues = Object.fromEntries(
        Object.entries(values).filter(
          ([key]) => !excludedFields.includes(key as keyof typeof values)
        )
      );

      // Convert numeric fields
      if (updatedValues.experience) {
        updatedValues.experience = Number(updatedValues.experience);
      }
      if (updatedValues.apointmentFee) {
        updatedValues.apointmentFee = Number(updatedValues.apointmentFee);
      }

      updatedValues.specialties = specialties;

      const updateData = {
        id: profileData?.data?.id,
        body: updatedValues,
      };

      const result = await updateDoctor(updateData).unwrap();

      if (result?.success) {
        toast.success("Profile updated successfully");
        refetch();
        router.push("/dashboard/doctor/profile");
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

  if (profileLoading || specialtiesLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <BaseForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
      <Box sx={{ display: "flex", my: "7px", justifyContent: "center" }}>
        <Typography variant="h4">Update Profile</Typography>
      </Box>
      <Grid container spacing={6} sx={{ width: "100%" }}>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="name"
            label="Name"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="email"
            type="email"
            label="Email"
            sx={{ width: "100%" }}
            //@ts-expect-error
            disabled
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="contactNumber"
            label="Contact Number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="address"
            label="Address"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="registrationNumber"
            label="Registration Number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="experience"
            type="number"
            label="Experience"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseSelectField
            items={Gender}
            name="gender"
            label="Gender"
            size="medium"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="apointmentFee"
            type="number"
            label="Appointment Fee"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="qualification"
            label="Qualification"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="currentWorkingPlace"
            label="Current Working Place"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <BaseInput
            size="medium"
            name="designation"
            label="Designation"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={4} marginTop={"-8px"}>
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
        loadingIndicator="Updating..."
        variant="contained"
        sx={{ mt: 5, py: 2, width: "30%" }}
      >
        {loading ? "Updating" : "Update Profile"}
      </LoadingButton>
    </BaseForm>
  );
};

export default ProfileUpdate;
