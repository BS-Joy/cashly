import React, { useState } from "react";
import { Table } from "antd";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import DashboardModal from "../../../Components/DashboardModal";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useGetAllAgenciesQuery } from "../../../features/buyeragency/buyerAgencySlice";
import RoundedButton from "../../../Components/RoundedButton";

const RejectedAgenciesTable = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetAllAgenciesQuery("cancel");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleSuspention = async () => {
    Swal.fire({
      text: "Are you sure you want to re-activate this agency?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        console.log("Agency reactivated.");
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
    { title: "Agency Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
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
  } else if (isError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  } else if (isSuccess) {
    console.log(data);
    const agenciesList =
      data?.data?.result?.filter((agency) => agency?.isSuspended === false) ||
      [];

    if (agenciesList.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">
          No rejected agencies found.
        </div>
      );
    } else {
      pageContent = (
        <Table
          columns={columns}
          dataSource={agenciesList.map((item, index) => ({
            key: item._id,
            index: index + 1,
            name:
              item?.agency?.firstName + " " + item?.agency?.lastName ||
              "Not available",
            email: item?.email || "Not available",
            phone: item?.phone || "Not available",
          }))}
          pagination={{ position: ["bottomCenter"] }}
          className="rounded-lg"
        />
      );
    }
  }

  return (
    <div
      className="border 
border-black rounded-lg"
    >
      <h3 className="text-2xl text-black my-4 pl-2">
        Rejected Agency Requests
      </h3>
      {pageContent}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">Agency Details</h2>
          <p>
            <strong>Name:</strong> {modalData.name || "Not available"}
          </p>
          <p>
            <strong>Email:</strong> {modalData.email || "Not available"}
          </p>
          <p>
            <strong>Phone:</strong> {modalData.phone || "Not available"}
          </p>
        </div>
        <div className="flex gap-4 px-4 justify-center mt-4">
          <RoundedButton
            onClickHandler={handleSuspention}
            className="w-fit px-16"
          >
            Approve
          </RoundedButton>
        </div>
      </DashboardModal>
    </div>
  );
};

export default RejectedAgenciesTable;
