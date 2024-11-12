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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import SpecialtiesModal from "./components/SpecialtiesModal";
import { useGetSpecialtiesQuery } from "@/redux/api/specialtyApi";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: specialtiesData, isLoading } = useGetSpecialtiesQuery({});

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Specialties</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Specialties
        </Button>
      </Stack>

      {/* Specialties Table */}
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
                    <IconButton aria-label="delete">
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
      </TableContainer>

      {/* Specialties Modal */}
      <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default SpecialtiesPage;
