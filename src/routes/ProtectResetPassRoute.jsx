import { Navigate } from "react-router-dom";
import localStorageUtil from "../utils/localstorageutils";
import useAuth from "../hooks/useAuth";

export default function ProtectResetPassRoute({ children }) {
  //   const cookies = new Cookies();
  const isTokenAvailable = localStorageUtil.getItem("token");
  const isEmailVerified = localStorageUtil.getItem("rpev");
  console.log(isEmailVerified);
  const user = useAuth();

  if (
    isTokenAvailable &&
    user?._id &&
    user?.role === "SUPER_ADMIN" &&
    isEmailVerified
  ) {
    return children;
  } else {
    return <Navigate to={"/settings/change-password/forgot-password"} />;
  }
}
