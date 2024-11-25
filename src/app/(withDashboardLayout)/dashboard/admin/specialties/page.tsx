"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import SpecialtiesModal from "./components/SpecialtiesModal";
import {
  useDeleteSpecialtyMutation,
  useGetSpecialtiesQuery,
} from "@/redux/api/specialtyApi";
import { toast } from "sonner";
import BaseTable from "@/components/Dashboard/BaseTable/BaseTable";

// Define the type for a specialty
interface Specialty {
  id: string;
  title: string;
  icon: string;
}

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: specialtiesData, isLoading } = useGetSpecialtiesQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  // Handle delete with correct error typing
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSpecialty(id).unwrap();
      if (response?.data?.id) {
        toast.success(response?.message || "Specialty deleted successfully");
      }
    } catch (err: unknown) {
      toast.error("Failed to delete specialty");
      if (err && typeof err === "object" && "message" in err) {
        console.error((err as { message: string }).message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  // Columns should specify that the row is of type Specialty
  const columns = [
    { label: "Title", key: "title" },
    {
      label: "Icon",
      key: "icon",
      render: (row: Specialty) => <Avatar alt={row.title} src={row.icon} />,
    },
    {
      label: "Action",
      key: "action",
      render: (row: Specialty) => (
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
        <Typography variant="h4">Specialties</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Specialties
        </Button>
      </Stack>

      {/* Use BaseTable with the correct typing */}
      <BaseTable
        columns={columns}
        data={specialtiesData?.data || []} // specialtiesData is typed properly
        isLoading={isLoading}
        emptyMessage="No specialties found."
      />

      <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default SpecialtiesPage;
