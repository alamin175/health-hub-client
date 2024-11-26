import { Imeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";

// Define types for the arguments and responses
type DoctorSchedule = {
  id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  date: string;
  isAvailable: boolean;
  [key: string]: unknown; // For extendable properties, if needed
};

type GetAllSchedulesArg = {
  page?: number;
  limit?: number;
  doctorId?: string;
  [key: string]: string | number | undefined; // Extendable for additional query params
};

type GetAllSchedulesResponse = {
  doctorSchedules: DoctorSchedule[];
  meta: Imeta;
};

export const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctorSchedule: build.mutation<void, Partial<DoctorSchedule>>({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),

    getAllDoctorSchedules: build.query<
      GetAllSchedulesResponse,
      GetAllSchedulesArg
    >({
      query: (arg) => ({
        url: "/doctor-schedule",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: DoctorSchedule[], meta: Imeta) => ({
        doctorSchedules: response,
        meta,
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    getDoctorSchedule: build.query<DoctorSchedule, string>({
      query: (id) => ({
        url: `/doctor-schedule/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    getMySchedule: build.query<DoctorSchedule[], void>({
      query: () => ({
        url: "/doctor-schedule/my-schedules",
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    deleteDoctorSchedule: build.mutation<void, string>({
      query: (id) => ({
        url: `/doctor-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const {
  useCreateDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
  useGetDoctorScheduleQuery,
  useGetMyScheduleQuery,
  useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
