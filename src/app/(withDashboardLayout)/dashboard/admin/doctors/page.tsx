"use client";
import BaseTable from "@/components/Dashboard/BaseTable/BaseTable";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const DoctorPage = () => {
  const { data, isLoading } = useGetAllDoctorsQuery({});
  // console.log(data);first
  const doctors = data?.doctors;
  const meta = data?.meta;
  console.log(doctors);
  const columns = [
    {
      label: "S.No.",
      key: "serial",
      render: (_: any, index: number) => index + 1, // Dynamically generate serial numbers
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Contact",
      key: "contactNumber",
    },
    {
      label: "Qualification",
      key: "qualification",
    },
    {
      label: "Experience (Years)",
      key: "experience",
    },
    {
      label: "Specialties",
      key: "doctorSpecialties",
      render: (row: any) =>
        row.doctorSpecialties.length > 0
          ? row.doctorSpecialties
              .map((specialty: any) => specialty.name)
              .join(", ")
          : "N/A",
    },
    {
      label: "Apointment Fee",
      key: "apointmentFee",
    },
    {
      label: "Profile Photo",
      key: "profilePhoto",
      render: (row: any) => <Avatar alt={row.name} src={row.profilePhoto} />,
    },
    {
      label: "Action",
      key: "action",
      render: (row: any) => (
        <Link href={`/dashboard/admin/doctors/${row.id}`}>
          <Button variant="outlined" size="small">
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Link href="/dashboard/admin/doctors/create-doctor">
          <Button variant="contained">Create Doctor</Button>
        </Link>
        <Typography variant="h4">Doctor's</Typography>
      </Stack>
      <BaseTable
        columns={columns}
        data={doctors || []}
        isLoading={isLoading}
        emptyMessage="No specialties found."
      />
    </Box>
  );
};

export default DoctorPage;
