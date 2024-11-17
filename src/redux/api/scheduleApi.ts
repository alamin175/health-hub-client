import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList"; // Ensure this import is correct

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),

    getSchedule: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: tagTypes.specialties, id: "LIST" }]
          : [{ type: tagTypes.specialties }],
    }),

    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),
  }),
});

export const { useCreateScheduleMutation } = scheduleApi;
