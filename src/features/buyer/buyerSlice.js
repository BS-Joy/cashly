import { Cookies } from "react-cookie";
import { apiSlice } from "../api/apiSlice";

export const extendedBuyersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuyers: builder.query({
      query: () => {
        const cookies = new Cookies();

        const token = cookies.get("token");

        return {
          url: "/buyer/get-all-buyers",
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
          },
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return response;
      },
      //   providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllBuyersQuery } = extendedBuyersApiSlice;
