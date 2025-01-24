import { Button } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import NotificationCard from "./NotificationCard";

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className=" rounded-lg min-h-screen bg-[#FDFDFD]">
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
      <div className="p-[24px]">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
};

export default Notifications;
