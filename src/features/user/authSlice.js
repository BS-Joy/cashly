import { Cookies } from "react-cookie";
import { apiSlice } from "../api/apiSlice";

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/auth/login",
          method: "POSt",
          body: credentials,
        };
      },
      transformResponse: (response) => {
        const cookies = new Cookies();

        cookies.set("token", response?.data?.accessToken, { path: "/" });

        return response;
      },
    }),
    getAllAdmin: builder.query({
      query: () => "/admin/get-admin",
      providesTags: (result) => {
        if (result?.data) {
          const { data } = result;

          const adminTags = data.map(({ _id }) => ({
            type: "admin",
            id: _id,
          }));

          return [...adminTags, { type: "admin", id: "LIST" }];
        }

        return [{ type: "admin", id: "LIST" }];
      },
    }),
    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: "admin/create-admin",
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: () => [{ type: "admin", id: "LIST" }],
    }),
    updateAdminProfile: builder.mutation({
      query: (updatedUserData) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: updatedUserData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminProfileMutation,
} = extendedAuthApiSlice;
