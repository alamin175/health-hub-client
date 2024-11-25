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
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

interface DoctorSpecialty {
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  qualification: string;
  experience: number;
  apointmentFee: number;
  profilePhoto: string;
  doctorSpecialties: DoctorSpecialty[];
}

const DoctorPage = () => {
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, string> = {};
  const debounceTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });

  if (!!debounceTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading, refetch } = useGetAllDoctorsQuery(query);
  const doctors: Doctor[] = data?.doctors || [];
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
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const errorMessage = (err as { data?: { message?: string } }).data
          ?.message;
        toast.error(errorMessage || "Error deleting doctor");
      } else {
        console.error(err);
      }
    }
  };

  const columns = [
    {
      label: "S.No.",
      key: "serial",
      render: (_: Doctor, index: number) => index + 1,
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
      render: (row: Doctor) =>
        row.doctorSpecialties.length > 0
          ? row.doctorSpecialties.map((specialty) => specialty.name).join(", ")
          : "N/A",
    },
    {
      label: "Apointment Fee",
      key: "apointmentFee",
    },
    {
      label: "Profile Photo",
      key: "profilePhoto",
      render: (row: Doctor) => <Avatar alt={row.name} src={row.profilePhoto} />,
    },
    {
      label: "Action",
      key: "action",
      render: (row: Doctor) => (
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
        emptyMessage="No Doctor's found."
      />
    </Box>
  );
};

export default DoctorPage;
