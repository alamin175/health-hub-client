import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypeList"; // Ensure this import is correct

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),

    getSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: tagTypes.specialties, id: "LIST" }]
          : [{ type: tagTypes.specialties }],
    }),

    deleteSpecialty: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.specialties, id: "LIST" }],
    }),
  }),
});

export const {
  useCreateSpecialtyMutation,
  useGetSpecialtiesQuery,
  useDeleteSpecialtyMutation,
} = specialtiesApi;
