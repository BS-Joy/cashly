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
    getAllAgencies: builder.query({
      query: () => "/agency/get-all-agencies",
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
    suspendBuyer: builder.mutation({
      query: (userData) => ({
        url: "/user-suspention/suspend-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: "buyer", id: arg?.userId }];
      },
    }),
    suspendAgency: builder.mutation({
      query: (userData) => ({
        url: "/user-suspention/suspend-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: "agency", id: arg?.userId }];
      },
    }),
  }),
});

export const {
  useGetAllBuyersQuery,
  useGetBuyersDocQuery,
  useGetAllAgenciesQuery,
  useSuspendBuyerMutation,
} = extendedBuyersApiSlice;
