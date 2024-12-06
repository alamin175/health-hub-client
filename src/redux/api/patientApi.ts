import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPatientProfile: build.query({
      query: (id) => ({
        url: `/patient/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patient],
    }),

    updatePatientProfile: build.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/patient/${id}`,
        method: "PATCH",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [tagTypes.patient],
    }),
  }),
});

export const { useGetPatientProfileQuery, useUpdatePatientProfileMutation } =
  patientApi;
