import Swal from "sweetalert2";
import { driverItems } from "../../../constants/driver.constants";
import {
  useGetAgenciesDocQuery,
  useGetAllAgenciesQuery,
} from "../../../features/buyer/buyerAgencySlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import AgencyRequestCard from "./AgencyRequestCard";

const AgencyRequest = () => {
  const {
    data: agencies,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllAgenciesQuery("pending");

  const {
    data,
    isLoading: docLoading,
    isError: docError,
    isSuccess: docSuccess,
  } = useGetAgenciesDocQuery();

  let pageContent;
  let allAgencyDocs;

  if (isLoading || docLoading) {
    pageContent = (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  if (isError || docError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess && docSuccess) {
    allAgencyDocs = data?.data?.result;

    const agencyList =
      agencies?.data?.result?.filter(
        (agency) => agency?.isSuspended === false
      ) || [];

    if (agencyList.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">
          No agency request yet!
        </div>
      );
    } else {
      pageContent = (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {agencyList.map((item, index) => {
            const agencyDoc = allAgencyDocs?.filter(
              (doc) => doc?.userId?.agency?._id === item?.agency?._id
            );
            return (
              <AgencyRequestCard item={item} key={index} doc={agencyDoc} />
            );
          })}
        </div>
      );
    }
  }

  const handleDeleteConfirmation = () => {
    Swal.fire({
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // dispatch(logout());
        // localStorage.removeItem("token");
        // localStorage.removeItem("user-update");
        // navigate("/auth");
      }
    });
  };
  return <>{pageContent}</>;
};

export default AgencyRequest;
