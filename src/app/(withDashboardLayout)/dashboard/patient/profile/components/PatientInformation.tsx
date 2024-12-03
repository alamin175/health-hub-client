"use client";
import { Box, Stack, styled, Typography } from "@mui/material";

// Define the type for the `data` prop
interface PatientInformationProps {
  data: {
    id: string;
    email: string;
    name: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    medicalReport: any[];
    patientHelthData: any | null;
  };
}

// Styled component for the information box
const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const PatientInformation = ({ data }: PatientInformationProps) => {
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Contact Number
          </Typography>
          <Typography>{data?.contactNumber}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Address
          </Typography>
          <Typography>{data?.address}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Status
          </Typography>
          <Typography>{data?.isDeleted ? "Deleted" : "Active"}</Typography>
        </StyledInformationBox>
      </Stack>

      <Typography variant="h5" my={2} color={"primary.main"}>
        Additional Information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} flexWrap={"wrap"} gap={2}>
        {/* <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Profile Photo
          </Typography>
          <Typography>
            {data?.profilePhoto ? (
              <img
                src={data.profilePhoto}
                alt={`${data.name}'s Profile`}
                style={{ width: "100px", borderRadius: "8px" }}
              />
            ) : (
              "No photo available"
            )}
          </Typography>
        </StyledInformationBox> */}
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Medical Reports
          </Typography>
          <Typography>
            {data?.medicalReport?.length > 0
              ? `${data.medicalReport.length} reports`
              : "No reports available"}
          </Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Health Data
          </Typography>
          <Typography>
            {data?.patientHelthData
              ? JSON.stringify(data.patientHelthData)
              : "No data available"}
          </Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Joined
          </Typography>
          <Typography>
            {new Date(data?.createdAt).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            })}
          </Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Last Updated
          </Typography>
          <Typography>
            {new Date(data?.updatedAt).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            })}
          </Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default PatientInformation;
