"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: specialtiesData, isLoading } = useGetSpecialtiesQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();
  console.log(specialtiesData);
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSpecialty(id).unwrap();
      if (response?.data?.id) {
        toast.success(response?.message || "Specialty deleted successfully");
      }
    } catch (err: any) {
      toast.error("Failed to delete specialty");
      console.error(err.message);
    }
  };

  const columns = [
    { label: "Title", key: "title" },
    {
      label: "Icon",
      key: "icon",
      render: (row: any) => <Avatar alt={row.title} src={row.icon} />,
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
        <Typography variant="h4">Specialties</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Specialties
        </Button>
      </Stack>
      {/* 
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : specialtiesData?.data?.length ? (
              specialtiesData.data.map((specialty: any) => (
                <TableRow key={specialty.id}>
                  <TableCell>{specialty.title}</TableCell>
                  <TableCell>
                    <Avatar alt={specialty.title} src={specialty.icon} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(specialty.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No specialties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer> */}

      <BaseTable
        columns={columns}
        data={specialtiesData?.data || []}
        isLoading={isLoading}
        emptyMessage="No specialties found."
      />

      <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default SpecialtiesPage;
