import { IDoctor } from "@/types/Doctors";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";
import { Imeta } from "@/types";

// Define a type for the argument used in `getAllDoctors`
type GetAllDoctorsArg = {
  page?: number;
  limit?: number;
  [key: string]: string | number | undefined; // Extendable for additional query params
};

// Define a type for the response of `getAllDoctors`
type GetAllDoctorsResponse = {
  doctors: IDoctor[];
  meta: Imeta;
  message: string;
};

// Define a type for `updateDoctor` argument
type UpdateDoctorRequest = {
  id: string;
  body: Partial<IDoctor>;
};

const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation<void, FormData>({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.doctor, id: "LIST" }],
    }),

    getAllDoctors: build.query<GetAllDoctorsResponse, GetAllDoctorsArg>({
      query: (arg) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: {
        data: IDoctor[];
        meta: Imeta;
        message: string;
      }) => ({
        doctors: response?.data,
        meta: response?.meta,
        message: response?.message,
      }),
      providesTags: [tagTypes.doctor],
    }),

    getDoctor: build.query<IDoctor, string>({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),

    deleteDoctor: build.mutation<void, string>({
      query: (id) => ({
        url: `/doctor/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.doctor, id: "LIST" }],
    }),

    updateDoctor: build.mutation<void, UpdateDoctorRequest>({
      query: (data) => ({
        url: `/doctor/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useDeleteDoctorMutation,
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} = doctorApi;
