"use client";
import BaseTable from "@/components/Dashboard/BaseTable/BaseTable";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { useDebounced } from "@/redux/hooks";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const DoctorPage = () => {
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debounceTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });

  if (!!debounceTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading, refetch } = useGetAllDoctorsQuery({ ...query });
  const doctors = data?.doctors;
  const meta = data?.meta;
  console.log(meta);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Error deleting doctor");
      console.error(err);
    }
  };
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
        <IconButton
          sx={{ color: "red" }}
          aria-label="delete"
          onClick={() => handleDelete(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <TextField
          size="small"
          placeholder="Search doctor"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ border: "1px solid #ff441c" }}
        />
        <Link href="/dashboard/admin/doctors/create-doctor">
          <Button variant="contained">Create Doctor</Button>
        </Link>
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
