import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
        providesTags: ["Category"],
      }),
    }),

    createCategoty: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        body: data,
        method: "POST",
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY_URL}/${id}`,
        body: data,
        method: "PUT",
      }),
    }),

    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data._id}`,
        method: "DELETE",
      }),
    }),

    getSingleCategory: builder.query({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data._id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategotyMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
