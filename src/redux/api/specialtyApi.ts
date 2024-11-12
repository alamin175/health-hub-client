import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
    getSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
        providesTags: [tagTypes.specialties],
      }),
    }),
  }),
});

// const allSpecialties = baseApi.injectEndpoints({
//   endpoints: (build) => ({}),
// });

export const { useCreateSpecialtyMutation, useGetSpecialtiesQuery } =
  specialtiesApi;
