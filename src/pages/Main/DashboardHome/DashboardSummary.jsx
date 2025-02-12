import React, { useEffect, useState } from "react";
import { useGetDashboardSummaryQuery } from "../../../features/dashboard/dashboardSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

export default function DashboardSummary() {
  const { data, isLoading, isError, error, isSuccess } =
    useGetDashboardSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }
  if (isError) {
    return <p>Sorry. Something went wrong!</p>;
  }

  if (isSuccess) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-32  gap-y-10 ">
        <div className=" flex items-center justify-center gap-6 border border-red-300 px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[29px] leading-[34.8px] text-black-300">
              {"Total number of buyer"}
            </h3>
            <h3 className="text-[45px] leading-[54px] font-extralight">
              {data?.data?.totalBuyer || "Not found!"}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-[24px] border border-red-300  py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[29px] leading-[34.8px] text-black-300">
              {"Total number of agencys"}
            </h3>
            <h3 className="text-[45px] leading-[54px] font-extralight">
              {data?.data?.totalAgencies || "Not found!"}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 border border-red-300 px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[29px] leading-[34.8px] text-black-300">
              {"Revenue generated"}
            </h3>
            <h3 className="text-[45px] leading-[54px] font-extralight">
              {data?.data?.totalRevenue || "Not found!"}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
