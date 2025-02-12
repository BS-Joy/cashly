import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import localStorageUtil from "../../utils/localstorageutils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorageUtil.getItem("token");

      if (
        !token &&
        !["login", "forgotPassword", "verifyEmail", "resetPassword"].includes(
          endpoint
        )
      ) {
        console.log(endpoint);
        throw new Error("Authorization token is missing");
      }

      if (
        token &&
        !["login", "forgotPassword", "verifyEmail", "resetPassword"].includes(
          endpoint
        )
      ) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "dashboard",
    "buyer",
    "buyerDoc",
    "agency",
    "agencyDoc",
    "admin",
    "suspendedUser",
    "user",
    "terms",
    "privacy",
    "trust",
    "notification",
  ],
  endpoints: (builder) => ({}),
});
