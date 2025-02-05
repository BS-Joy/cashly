import React, { useState } from "react";
import { Table } from "antd";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DashboardModal from "../../../Components/DashboardModal";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import RoundedButton from "../../../Components/RoundedButton";
import { useGetAllBuyersQuery } from "../../../features/buyer/buyerSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Buyers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const {
    data: buyersList,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllBuyersQuery();

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
    pageContent = <LoadingSpinner size={12} color="stroke-primary" />;
  }

  if (isError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess) {
    const filteredBuyers = buyersList.data.result.filter(
      (d) => d.loginStatus === "approved"
    );

    if (filteredBuyers.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">No buyers found.</div>
      );
    } else {
      pageContent = (
        <Table
          columns={columns}
          dataSource={filteredBuyers.map((item, index) => ({
            key: item._id,
            index: index + 1, // SL number
            name: item.buyer
              ? `${item.buyer.firstName || ""} ${
                  item.buyer.lastName || ""
                }`.trim() || "Not available"
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
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Buyer List</h3>

      {pageContent}
      {/* Buyer Details Modal */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">Buyer Details</h2>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Buyer Name:</p>
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
        </div>
        <div className="flex justify-center mt-4">
          <RoundedButton className="w-fit px-24">Download</RoundedButton>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Buyers;
