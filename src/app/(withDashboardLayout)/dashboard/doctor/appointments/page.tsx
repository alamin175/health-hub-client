/* @ts-nocheck */
"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";
import { dateFormatter } from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "../schedules/components/DoctorScheduleModal/MultipleSelectSchedule";
import { useState } from "react";
import { useCreatePrescriptionMutation } from "@/redux/api/prescriptionApi";

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  const [createPrescription] = useCreatePrescriptionMutation();
  const appointments = data?.appointments.data;

  const [selectedAppoinment, setSelectedAppoinment] = useState(null); // Store selected appointment
  const [openModal, setOpenModal] = useState(false); // Modal open/close state
  const [followUpDate, setFollowUpDate] = useState(""); // Follow-up date state
  const [instructions, setInstructions] = useState(""); // Instructions state

  // Handle form submission to create a prescription
  const handleSubmit = async () => {
    const prescriptionData = {
      appointmentId: selectedAppoinment, // Get the selected appointment ID
      followUpDate: followUpDate, // Follow-up date
      instructions: instructions, // Instructions in HTML format
    };
    try {
      await createPrescription(prescriptionData); // Call the API to create a prescription
      setOpenModal(false); // Close the modal on success
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.patient?.name;
      },
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.patient?.contactNumber;
      },
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return dateFormatter(row.schedule.startDate);
      },
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return getTimeIn12HourFormat(row?.schedule?.startDate);
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Join",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Link href={`/video?videoCallingId=${row?.videoCallingId}`}>
            <IconButton>
              <VideocamIcon />
            </IconButton>
          </Link>
        );
      },
    },
    // {
    //   field: "createPrescription",
    //   headerName: "Create Prescription",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: ({ row }) => (
    //     <Button
    //       variant="outlined"
    //       onClick={() => {
    //         setSelectedAppoinment(row.id); // Set the selected appointment ID
    //         setOpenModal(true); // Open the modal
    //       }}
    //     >
    //       Create Prescription
    //     </Button>
    //   ),
    // },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={appointments ?? []}
            columns={columns}
            loading={isLoading}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}

      {/* Modal for creating a prescription */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Create Prescription</DialogTitle>
        <DialogContent>
          {/* Follow-up date field */}
          <TextField
            label="Follow-up Date"
            type="datetime-local"
            fullWidth
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            margin="normal"
            required
          />
          {/* Instructions field */}
          <TextField
            label="Instructions"
            multiline
            rows={4}
            fullWidth
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientAppointmentsPage;
