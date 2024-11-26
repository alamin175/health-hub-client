import { ISchedule } from "@/types/Schedule";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";
import { Imeta } from "@/types";

// Define types for arguments and responses
type GetAllScheduleArg = {
  page?: number;
  limit?: number;
  [key: string]: string | number | undefined; // Extendable for additional query parameters
};

type GetAllScheduleResponse = {
  schedules: ISchedule[];
  meta: Imeta;
  message: string;
};

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation<void, Partial<ISchedule>>({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),

    getAllSchedule: build.query<GetAllScheduleResponse, GetAllScheduleArg>({
      query: (arg) => ({
        url: "/schedule",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: {
        data: ISchedule[];
        meta: Imeta;
        message: string;
      }) => ({
        schedules: response.data,
        meta: response.meta,
        message: response.message,
      }),
      providesTags: (result) =>
        result
          ? [{ type: tagTypes.specialties, id: "LIST" }]
          : [{ type: tagTypes.specialties }],
    }),

    deleteSchedule: build.mutation<void, string>({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllScheduleQuery,
  useDeleteScheduleMutation,
} = scheduleApi;
