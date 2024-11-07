"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import React from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/service/actions/patientRegister";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authKey } from "@/constance/authKey";
import { userLogin } from "@/service/actions/userLogin";
import Cookies from "js-cookie";

interface PatientData {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

interface PatientFormData {
  password: string;
  patient: PatientData;
}

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>();
  const onSubmit: SubmitHandler<PatientFormData> = async (values) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      console.log(res);
      if (res?.success) {
        // toast.success(res?.message);
        const info = await userLogin({
          email: values.patient.email,
          password: values.password,
        });
        console.log(info);
        if (info?.success) {
          toast.success("Patient created successfully");
          if (info?.data?.accessToken) {
            Cookies.set(authKey, info?.data?.accessToken);
          }
          router.push("/");
        } else {
          toast.error(res?.message);
        }
        console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "50px",
            boxShadow: 1,
            maxWidth: 600,
            width: "100%",
            p: 4,
          }}
        >
          <Box display="flex" alignItems="center" color="primary.main" gap={2}>
            <AppRegistrationIcon sx={{ fontSize: 40 }} />
            <Typography
              fontWeight={700}
              color="secondary.main"
              variant="h4"
              component="h2"
            >
              Patient Register
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  my: 3,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register("patient.name")}
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  {...register("patient.email")}
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  {...register("password")}
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />

                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  type="number"
                  {...register("patient.contactNumber")}
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  {...register("patient.address")}
                  sx={{
                    color: "secondary.dark",
                    "& label": { color: "secondary.dark" },
                  }}
                />
              </Box>
              <Button type="submit" fullWidth sx={{ my: 1 }}>
                Register
              </Button>
              <Typography textAlign="center" my={2}>
                Do you already have an account?{" "}
                <Link className="text-red-600" href="/login">
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
