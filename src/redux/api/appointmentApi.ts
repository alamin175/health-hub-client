import { Imeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";

// Define types for the arguments and responses
type Appointment = {
  id: string;
  date: string;
  time: string;
  doctorId: string;
  patientId: string;
  status: string;
  [key: string]: unknown; // Extendable for additional fields
};

type CreateAppointmentRequest = {
  date: string;
  time: string;
  doctorId: string;
  patientId: string;
};

type AppointmentStatusChangeRequest = {
  id: string;
  body: {
    status: string;
  };
};

type GetAllAppointmentsResponse = {
  appointments: Appointment[];
  meta: Imeta;
};

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAppointment: build.mutation<Appointment, CreateAppointmentRequest>({
      query: (data) => ({
        url: "/appointment",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.appointment],
    }),
    getAllAppointments: build.query<
      GetAllAppointmentsResponse,
      Partial<{ page: number; limit: number }>
    >({
      query: (arg) => ({
        url: "/appointment",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: Appointment[], meta: Imeta) => ({
        appointments: response,
        meta,
      }),
      providesTags: [tagTypes.appointment],
    }),
    getMyAppointments: build.query<
      GetAllAppointmentsResponse,
      Partial<{ page: number; limit: number }>
    >({
      query: (arg) => ({
        url: "/appointment/my-appointments",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: Appointment[], meta: Imeta) => ({
        appointments: response,
        meta,
      }),
      providesTags: [tagTypes.appointment],
    }),
    getAppointment: build.query<Appointment, string>({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.appointment],
    }),
    appointmentStatusChange: build.mutation<
      void,
      AppointmentStatusChangeRequest
    >({
      query: (data) => ({
        url: `/appointment/status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.appointment],
    }),
    deleteAppointment: build.mutation<void, string>({
      query: (id) => ({
        url: `/appointment/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.appointment],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetMyAppointmentsQuery,
  useGetAppointmentQuery,
  useAppointmentStatusChangeMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
