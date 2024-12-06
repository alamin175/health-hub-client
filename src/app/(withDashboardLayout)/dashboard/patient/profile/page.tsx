"use client";

import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Link from "next/link";

import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile";
import PatientInformation from "./components/PatientInformation";
import AutoFileUploader from "@/components/Ui/Forms/AutoFileUploader";

const PatientProfile = () => {
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  console.log("dd", data);

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Photo Section */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data?.data?.profilePhoto ? (
              <Image
                height={400}
                width={400}
                src={data.data.profilePhoto}
                alt="User Photo"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <p>No Profile Photo Available</p>
            )}
          </Box>
          <Box my={3}>
            {updating ? (
              <p>Uploading...</p>
            ) : (
              <AutoFileUploader
                name="file"
                label="Choose Your Profile Photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              />
            )}
          </Box>

          {/* <Button
            endIcon={<ModeEditIcon />}
            variant="contained"
            component={Link}
            href={`/dashboard/patient/${data?.data?.id}`}
          >
            Edit Profile
          </Button> */}
        </Grid>

        {/* Profile Information Section */}
        <Grid item xs={12} md={8}>
          <PatientInformation data={data?.data} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientProfile;
