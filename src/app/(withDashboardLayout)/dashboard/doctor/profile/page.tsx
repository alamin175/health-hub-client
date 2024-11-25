"use client";

import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import React, from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile";
import AutoFileUploader from "@/components/Ui/Forms/AutoFileUploader";
import DoctorInformation from "./components/DoctorInformations";
import Link from "next/link";

const Profile = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      {/* <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      /> */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 400,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                height={400}
                width={400}
                src={data?.data?.profilePhoto}
                alt="User Photo"
              />
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

            <Button
              endIcon={<ModeEditIcon />}
              variant="contained"
              component={Link}
              href={`/dashboard/doctor/${data?.data?.id}`}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            <DoctorInformation data={data?.data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
