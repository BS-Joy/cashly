import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import {
  useGetAllSuspendedUsersQuery,
  useReactiveUserMutation,
  useAutoReactiveUserMutation,
} from "../../../features/buyeragency/buyerAgencySlice";
import { formatDateTime } from "../../../utils";
import { Cron } from "react-js-cron";

const SuspendListPage = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetAllSuspendedUsersQuery();

  const [reactiveUser] = useReactiveUserMutation();
  const [autoReactiveUser] = useAutoReactiveUserMutation();
  const [loadingStates, setLoadingStates] = useState({});
  const [cronValue, setCronValue] = useState("*/1 * * * *"); // Run every minute

  const handleReactiveUser = async (userId) => {
    Swal.fire({
      text: "Are you sure you want to reactivate this user?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        setLoadingStates((prev) => ({ ...prev, [userId]: true }));

        try {
          await reactiveUser(userId).unwrap();
        } finally {
          setLoadingStates((prev) => ({ ...prev, [userId]: false }));
        }
      }
    });
  };

  // 🔹 Cron Job for Auto Reactivation
  // useEffect(() => {
  //   const autoReactivate = async () => {
  //     try {
  //       await autoReactiveUser().unwrap(); // Ensures the request completes before proceeding
  //     } catch (error) {
  //       console.error("Auto-reactivation failed:", error);
  //     }
  //   };

  //   const interval = setInterval(autoReactivate, 60000); // Runs every minute

  //   return () => clearInterval(interval);
  // }, [autoReactiveUser]);

  const columns = [
    {
      title: "#SL",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Suspension End Date",
      dataIndex: "suspensionEndDate",
      key: "suspensionEndDate",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, data) => (
        <button
          onClick={() => handleReactiveUser(data?.key)}
          className="bg-white border font-semibold text-primary border-primary px-4 rounded py-1 hover:bg-red-50"
          disabled={loadingStates[data?.key]}
        >
          {loadingStates[data?.key] ? (
            <LoadingSpinner size={5} color="stroke-primary" />
          ) : (
            "Reactivate User"
          )}
        </button>
      ),
    },
  ];

  let pageContent;

  if (isLoading) {
    pageContent = (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  } else if (isError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  } else if (isSuccess) {
    const suspendedBuyers = data.data || [];

    if (suspendedBuyers.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">
          No suspended users found.
        </div>
      );
    } else {
      pageContent = (
        <Table
          columns={columns}
          dataSource={suspendedBuyers.map((item, index) => {
            const entity = item.buyer || item.agency || item;
            return {
              key: item._id,
              index: index + 1,
              name:
                `${entity?.firstName || ""} ${entity?.lastName || ""}`.trim() ||
                "Not available",
              email: entity?.email || "Not available",
              phone: entity?.phone || "Not available",
              suspensionEndDate: formatDateTime(item.suspensionEndDate),
            };
          })}
          pagination={{ position: ["bottomCenter"] }}
          className="rounded-lg"
        />
      );
    }
  }

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Suspended Users List</h3>
      <Cron value={cronValue} setValue={setCronValue} className="hidden" />
      {pageContent}
    </div>
  );
};

export default SuspendListPage;
