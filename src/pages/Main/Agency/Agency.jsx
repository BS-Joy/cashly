import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import {
  useGetAllAgenciesQuery,
  useGetAllBuyersQuery,
} from "../../../features/buyer/buyerAgencySlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import RoundedButton from "../../../Components/RoundedButton";

const Agency = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [suspentionDays, setSuspentionDays] = useState(0);

  const handleSuspention = async () => {
    Swal.fire({
      text: "Are you sure you want to suspend this user?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        console.log({
          userId: modalData?.key,
          day: parseInt(suspentionDays),
        });
        // const res = await suspendBuyer({
        //   userId: modalData?.key,
        //   day: suspentionDays,
        // }).unwrap();
        console.log("User suspended for: ", suspentionDays, "days");
      }
    });
  };

  const {
    data: agencyList,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllAgenciesQuery("approved");

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1, // Auto-generate serial number
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
      title: "Action",
      key: "action",
      align: "center",
      render: (_, data) => (
        <div className="flex items-center justify-around text-center">
          <img
            src={exlamIcon}
            alt="View Details"
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
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
  }

  if (isError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess) {
    console.log(agencyList);
    if (agencyList.data.result.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">No agency found.</div>
      );
    } else {
      pageContent = (
        <Table
          columns={columns}
          dataSource={agencyList.data.result.map((item, index) => {
            const agency = item.agency;
            return {
              key: agency._id,
              index: index + 1, // SL number
              name: agency
                ? `${agency.firstName || ""} ${agency.lastName || ""}`.trim() ||
                  "Not available"
                : "Not available",

              email: agency.email || "Not available",
              phone: agency.phone || "Not available",
              // transAmount: agency.transAmount || "Not available",
              // subscription: agency.subscription || "Not available",
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
      <h3 className="text-2xl text-black mb-4 pl-2">Agency List</h3>
      {/* Ant Design Table */}
      {pageContent}

      {/* Dashboard Modal */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
        backgroundColor="bg-[#EDEAF3]"
      >
        <div className="">
          <h2 className="text-lg text-center mb-4">Agency Details</h2>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Agency Name :</p>
            <p>{modalData.name || "Not available"}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Email:</p>
            <p>{modalData.email || "Not available"}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Phone:</p>
            <p>{modalData.phone || "Not available"}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Transaction amount :</p>
            <p>{modalData.transAmount || "Not available"}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Subscription Purchased:</p>
            <p>{modalData.subscription || "Not available"}</p>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <input
              onChange={(e) => {
                const susDays = e.target.value;
                setSuspentionDays(susDays);
              }}
              type="number"
              className="w-[100px] pl-5 border border-primary rounded outline-none"
              value={suspentionDays}
            />
            <RoundedButton
              onClickHandler={handleSuspention}
              className="w-fit px-24"
            >
              Suspend
            </RoundedButton>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Agency;
