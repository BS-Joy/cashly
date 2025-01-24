import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";

const Agency = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone Number",
      key: "Phone",
      dataIndex: "Phone",
    },
    {
      title: "Action",
      key: "Review",
      aligen: "center",
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex ">
          {/* Review Icon */}
          <img
            src={exlamIcon}
            alt=""
            className="btn  px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
          {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
                 
                  View
                </Link> */}
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 20; index++) {
    data.push({
      transIs: `${index + 1}`,
      name: "Henry",
      Email: "sharif@gmail.com",
      Phone: "+12746478994",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }
  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Agency List</h3>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />

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
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Address :</p>
            <p>{modalData.name}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Date :</p>
            <p>{modalData.Email}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Transaction Amount :</p>
            <p>{modalData.Phone}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Subscription Purchased :</p>
            <p>{modalData.transIs}</p>
          </div>

          <div className="p-4 mt-auto text-center mx-auto flex items-center justify-center">
            <button className="w-fit bg-red-700 text-white px-10 py-2 flex items-center justify-center gap-3 text-lg outline-none rounded-2xl">
              <span className="text-white font-light">Download</span>
            </button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Agency;
