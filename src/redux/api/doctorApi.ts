import { IDoctor } from "@/types/Doctors";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";
import { Imeta } from "@/types";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.doctor, id: "LIST" }],
    }),

    getAllDoctors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: {
        data: IDoctor[];
        meta: Imeta;
        message: string;
      }) => {
        return {
          doctors: response.data,
          meta: response.meta,
          message: response.message,
        };
      },
      providesTags: [tagTypes.doctor],
    }),
  }),
});

export const { useCreateDoctorMutation, useGetAllDoctorsQuery } = doctorApi;
