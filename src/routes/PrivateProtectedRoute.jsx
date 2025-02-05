import React from "react";
import { Cookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateProtectedRoute({ children }) {
  const cookies = new Cookies();
  const isTokenAvailable = cookies.get("token");
  const user = useSelector((state) => state.user.user);

  if (isTokenAvailable && user?._id && user?.role === "SUPER_ADMIN") {
    return children;
  } else {
    return <Navigate to={"/auth/sign-in"} />;
  }
}
