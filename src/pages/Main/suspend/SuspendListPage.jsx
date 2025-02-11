import React from "react";
import { Table } from "antd";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useGetAllSuspendedUsersQuery } from "../../../features/buyer/buyerAgencySlice";
import { formatDateTime } from "../../../utils";

const SuspendListPage = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetAllSuspendedUsersQuery();

  const handleSuspention = async (userId) => {
    Swal.fire({
      text: "Are you sure you want to reactivate this user?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        console.log(`User ${userId} is reactivated.`);
        // Call API to reactivate the user here
      }
    });
  };

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
          onClick={() => handleSuspention(data.key)}
          className="bg-white border font-semibold text-primary border-primary px-4 rounded py-1 hover:bg-red-50"
        >
          Reactivate User
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
            const entity = item.buyer || item.agency || item; // Prioritize buyer, then agency, then item itself

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
      {pageContent}
    </div>
  );
};

export default SuspendListPage;
