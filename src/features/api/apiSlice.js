import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (
        !token &&
        !["login", "forgotPass", "verifyEmail", "resetPassword"].includes(
          endpoint
        )
      ) {
        throw new Error("Authorization token is missing");
      }

      if (
        token &&
        !["login", "forgotPass", "verifyEmail", "resetPassword"].includes(
          endpoint
        )
      ) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["dashboard", "buyer", "buyerDoc", "agency", "admin", "user"],
  endpoints: (builder) => ({}),
});
