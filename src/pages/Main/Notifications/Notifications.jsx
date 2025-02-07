import { Button } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useGetAdminNotificationsQuery } from "../../../features/dashboard/dashboardSlice";

const Notifications = () => {
  const navigate = useNavigate();

  const {
    data: notifications,
    isLoading,
    isSuccess,
    isError,
  } = useGetAdminNotificationsQuery();

  let notificationList;

  if (isLoading) {
    notificationList = (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  if (isError) {
    notificationList = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess) {
    const allNotifications = notifications?.data?.result;
    if (allNotifications?.length < 1) {
      notificationList = (
        <p className="text-center">You have 0 notifications.</p>
      );
    } else {
      notificationList = (
        <div className="p-[24px]">
          {allNotifications?.map((noti, index) => (
            <NotificationCard key={index} data={noti} />
          ))}
        </div>
      );
    }
  }
  return (
    <div className="rounded-lg min-h-[80vh] bg-[#FDFDFD]">
      <div className="px-[32px] py-6 text-white bg-info rounded-t-lg flex items-center gap-3">
        <FaAngleLeft
          onClick={() => navigate(-1)}
          className="text-white"
          size={34}
        />
        <h1 className="text-[30px] text-red-700 font-bold">
          All Notifications
        </h1>
      </div>
      {notificationList}
    </div>
  );
};

export default Notifications;
