import { apiSlice } from "../api/apiSlice";
import { Cookies } from "react-cookie";

export const extendedDashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => {
        const cookies = new Cookies();
        const token = cookies.get("token");

        return {
          url: "/dashboard/get-total-statistics",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = extendedDashboardApiSlice;
