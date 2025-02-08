import React from "react";
import { Cookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectResetPassRoute({ children }) {
  const cookies = new Cookies();
  const isTokenAvailable = cookies.get("token");
  const isEmailVerified = cookies.get("rpev");
  console.log(isEmailVerified);
  const user = useSelector((state) => state.user.user);

  if (
    isTokenAvailable &&
    user?._id &&
    user?.role === "SUPER_ADMIN" &&
    isEmailVerified
  ) {
    return children;
  } else {
    return (
      <Navigate
        to={"/settings/change-password/forgot-password"}
        state={{ msg: "Please verify email first." }}
      />
    );
  }
}
