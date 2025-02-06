import { apiSlice } from "../api/apiSlice";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

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
    getEarningDataForChart: builder.query({
      query: () => {
        const cookies = new Cookies();
        const token = cookies.get("token");

        return {
          url: "/dashboard/get-total-earning",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
      },
    }),
    getRecentUser: builder.query({
      query: () => {
        return {
          url: "/dashboard/get-total-earning",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDashboardSummaryQuery, useGetEarningDataForChartQuery } =
  extendedDashboardApiSlice;
