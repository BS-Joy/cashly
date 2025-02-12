import { Cookies } from "react-cookie";
import { apiSlice } from "../api/apiSlice";
import localStorageUtil from "../../utils/localstorageutils";

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

        localStorageUtil.setItem("token", response?.data?.accessToken);

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
    adminPasswordChange: builder.mutation({
      query: (passwords) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (verificationData) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: verificationData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ values, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: values, // Send only password data
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminProfileMutation,
  useAdminPasswordChangeMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = extendedAuthApiSlice;
