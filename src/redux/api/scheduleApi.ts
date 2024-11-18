import { ISchedule } from "@/types/Schedule";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList"; // Ensure this import is correct
import { Imeta } from "@/types";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),

    getAllSchedule: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: {
        data: ISchedule[];
        meta: Imeta;
        message: string;
      }) => {
        return {
          schedules: response?.data,
          meta: response?.meta,
          message: response?.message,
        };
      },
      providesTags: (result) =>
        result
          ? [{ type: tagTypes.specialties, id: "LIST" }]
          : [{ type: tagTypes.specialties }],
    }),

    deleteSchedule: build.mutation({
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
