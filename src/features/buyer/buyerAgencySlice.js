import { Cookies } from "react-cookie";
import { apiSlice } from "../api/apiSlice";

export const extendedBuyersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuyers: builder.query({
      query: (status) => ({
        url: `/buyer/get-all-buyers?loginStatus=${status}`,
      }),
      providesTags: (result) => {
        if (result?.data) {
          const { result: buyersList } = result.data; // Rename 'result' to 'buyersList'

          // Generate tags for each buyer
          const buyerTags = buyersList.map(({ _id }) => ({
            type: "buyer",
            id: _id,
          }));

          return [
            ...buyerTags,
            { type: "buyer", id: "LIST" }, // Tag for the whole list
          ];
        }

        // Return a fallback if no result exists
        return [{ type: "buyer", id: "LIST" }];
      },
    }),
    getBuyersDoc: builder.query({
      query: () => "/document/get-document-buyer",
      providesTags: (result) => {
        if (result?.data) {
          const { result: buyersList } = result.data; // Rename 'result' to 'buyersList'

          // Generate tags for each buyer
          const buyerTags = buyersList.map(({ _id }) => ({
            type: "buyerDoc",
            id: _id,
          }));

          return [
            ...buyerTags,
            { type: "buyerDoc", id: "LIST" }, // Tag for the whole list
          ];
        }

        // Return a fallback if no result exists
        return [{ type: "buyerDoc", id: "LIST" }];
      },
    }),
    getAgenciesDoc: builder.query({
      query: () => "/document/get-document-agency",
      providesTags: (result) => {
        if (result?.data) {
          const { result: agencyList } = result.data; // Rename 'result' to 'buyersList'

          // Generate tags for each buyer
          const agencyTags = agencyList.map(({ _id }) => ({
            type: "agencyDoc",
            id: _id,
          }));

          return [
            ...agencyTags,
            { type: "agencyDoc", id: "LIST" }, // Tag for the whole list
          ];
        }

        // Return a fallback if no result exists
        return [{ type: "agencyDoc", id: "LIST" }];
      },
    }),
    getAllAgencies: builder.query({
      query: (status) => `/agency/get-all-agencies?loginStatus=${status}`,
      providesTags: (result) => {
        if (result?.data) {
          const { result: agencyList } = result.data; // Rename 'result' to 'buyersList'

          // Generate tags for each buyer
          const agencyTags = agencyList.map(({ _id }) => ({
            type: "agency",
            id: _id,
          }));

          return [
            ...agencyTags,
            { type: "agency", id: "LIST" }, // Tag for the whole list
          ];
        }

        // Return a fallback if no result exists
        return [{ type: "agency", id: "LIST" }];
      },
    }),
    suspendUser: builder.mutation({
      query: ({ toSuspend, userId, days }) => ({
        url: "/user-suspention/suspend-user",
        method: "POST",
        body: { userId, days }, // Only sending userId and days to the server
      }),
      invalidatesTags: (result, err, arg) => {
        return [
          {
            type: arg.toSuspend === "buyer" ? "buyer" : "agency",
            id: arg.userId,
          },
          { type: "suspendedUser", id: "LIST" }, // Constant tag
        ];
      },
    }),

    getAllSuspendedUsers: builder.query({
      query: () => "/user-suspention/get-suspended-users",
      providesTags: (result) => {
        if (result?.data) {
          const suspendUsers = result.data; // Rename 'result' to 'buyersList'

          // Generate tags for each buyer
          const suspendUserTags = suspendUsers.map(({ _id }) => ({
            type: "suspendedUser",
            id: _id,
          }));

          return [
            ...suspendUserTags,
            { type: "suspendedUser", id: "LIST" }, // Tag for the whole list
          ];
        }

        // Return a fallback if no result exists
        return [{ type: "suspendedUser", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetAllBuyersQuery,
  useGetBuyersDocQuery,
  useGetAgenciesDocQuery,
  useGetAllAgenciesQuery,
  useSuspendUserMutation,
  useGetAllSuspendedUsersQuery,
} = extendedBuyersApiSlice;
