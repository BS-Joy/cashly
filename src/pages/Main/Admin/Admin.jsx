import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { FaPlus } from "react-icons/fa6";
import RoundedButton from "../../../Components/RoundedButton";
import AddAdminModal from "./AddAdminModal";
import { useGetAllAdminQuery } from "../../../features/user/authSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import AddAdminForm from "./AddAdminForm";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const {
    data: adminList,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllAdminQuery();

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
            // onClick={() => showModal(data)}
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
    // console.log(adminList);

    if (adminList.data.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">No buyers found.</div>
      );
    } else {
      pageContent = (
        <Table
          columns={columns}
          dataSource={adminList.data.map((item, index) => ({
            key: item._id,
            index: index + 1, // SL number
            name: item
              ? `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
                "Not available"
              : "Not available",

            email: item.email || "Not available",
            phone: item.phone || "Not available",
            transAmount: item.transAmount || "Not available",
            subscription: item.subscription || "Not available",
          }))}
          pagination={{ position: ["bottomCenter"] }}
          className="rounded-lg"
        />
      );
    }
  }

  return (
    <>
      <div className="flex justify-end">
        {/* add admin button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-fit bg-transparent text-black border border-red-700 px-10 py-[10px] flex items-center justify-end gap-3 text-sm outline-none rounded-lg"
        >
          <FaPlus color="#9C1B1B" />
          <span className="text-red-700 font-light">Add Admin</span>
        </button>
      </div>
      <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
        <h3 className="text-2xl text-black mb-4 pl-2">Add Admin</h3>

        {/* Ant Design Table */}
        {pageContent}

        {/* Dashboard Modal for add admin */}
        <AddAdminModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          maxWidth="700px"
          onAddAdminPage={true}
        >
          <AddAdminForm setIsModalOpen={setIsModalOpen} />
        </AddAdminModal>
      </div>
    </>
  );
};

export default Admin;
