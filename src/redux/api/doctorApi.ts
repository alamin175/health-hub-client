import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.doctor, id: "LIST" }],
    }),
  }),
});

export const { useCreateDoctorMutation } = doctorApi;
