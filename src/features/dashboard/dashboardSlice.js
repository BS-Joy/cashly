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
          url: "/dashboard/recent-user",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
      },
    }),
    getTermsCondition: builder.query({
      query: () => "/setting/get-terms",
      providesTags: ["terms"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => "/setting/get-privacy",
      providesTags: ["privacy"],
    }),
    getTrustSafety: builder.query({
      query: () => "/setting/get-terms",
      providesTags: ["trust"],
    }),
    getAdminNotifications: builder.query({
      query: () => "/notification/admin",
      providesTags: ["notification"],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetEarningDataForChartQuery,
  useGetRecentUserQuery,
  useGetTermsConditionQuery,
  useGetPrivacyPolicyQuery,
  useGetTrustSafetyQuery,
  useGetAdminNotificationsQuery,
} = extendedDashboardApiSlice;
