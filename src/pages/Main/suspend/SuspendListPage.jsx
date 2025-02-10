import React, { useState } from "react";
import { Table } from "antd";
import Swal from "sweetalert2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DashboardModal from "../../../Components/DashboardModal";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import RoundedButton from "../../../Components/RoundedButton";

const SuspendListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [suspentionDays, setSuspentionDays] = useState(0);

  // Demo Data
  const buyersList = [
    {
      _id: "1",
      buyer: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "123-456-7890",
      },
      transAmount: "$500",
      subscription: "Premium",
    },
    {
      _id: "2",
      buyer: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
      },
      transAmount: "$200",
      subscription: "Basic",
    },
    {
      _id: "3",
      buyer: {
        firstName: "Alice",
        lastName: "Brown",
        email: "alice@example.com",
        phone: "555-666-7777",
      },
      transAmount: "$300",
      subscription: "Standard",
    },
  ];

  //   const showModal = (data) => {
  //     setIsModalOpen(true);
  //     setModalData(data);
  //   };

  const handleSuspention = async () => {
    Swal.fire({
      text: "Are you sure you want to re-active this user?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        console.log("User is reactivated.");
      }
    });
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
          {/* <img
            src={exlamIcon}
            alt="View Details"
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          /> */}
          <button
            onClick={handleSuspention}
            className="bg-white border font-semibold text-primary border-primary px-4 rounded py-1 hover:bg-red-50"
          >
            Re-active User
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Suspends users list</h3>

      <Table
        columns={columns}
        dataSource={buyersList.map((item, index) => ({
          key: item._id,
          index: index + 1,
          name: `${item.buyer.firstName} ${item.buyer.lastName}`.trim(),
          email: item.buyer.email,
          phone: item.buyer.phone,
          transAmount: item.transAmount,
          subscription: item.subscription,
        }))}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />

      {/* <DashboardModal
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
        <div className="flex gap-4 justify-center mt-4">
          <input
            onChange={(e) => setSuspentionDays(e.target.value)}
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
      </DashboardModal> */}
    </div>
  );
};

export default SuspendListPage;
