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
    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center",
    //   render: (_, data) => (
    //     <div className="flex items-center justify-around text-center">
    //       <img
    //         src={exlamIcon}
    //         alt="View Details"
    //         className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
    //         onClick={() => showModal(data)}
    //       />
    //     </div>
    //   ),
    // },
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
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
            }}
            onFinish={() => console.log("task finish")}
            requiredMark={false}
            className="text-start w-full mt-6"
          >
            <Form.Item
              name="user Id"
              rules={[
                {
                  required: true,
                  message: "Please input id!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="User Id *"
                className="rounded-md bg-white border border-red-400 pl-6"
              />
            </Form.Item>

            {/* names */}
            <div className="flex gap-3 justify-between">
              {/* first name */}
              <Form.Item
                className="w-full"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please input first name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="First Name *"
                  className="rounded-md bg-white border border-red-400 pl-6"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>

              {/* last name */}
              <Form.Item
                className="w-full"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please input last name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Last Name *"
                  className="rounded-md bg-white border border-red-400 pl-6 w-full"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>
            </div>

            {/* email mobile & role */}
            <div className="flex items-center gap-3">
              {/* email */}
              <Form.Item
                className="w-full"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please input an email!",
                  },
                  {
                    required: true,
                    message: "Please input first name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email *"
                  className="rounded-md bg-white border border-red-400 pl-6"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>

              {/* mobile */}
              <Form.Item
                className="w-full"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input last name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Mobile *"
                  className="rounded-md bg-white border border-red-400 pl-6"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>

              {/* role */}
              <Form.Item
                className="w-full"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please select a role!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a role *"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "1", label: "Accountant" },
                    { value: "2", label: "Moderator" },
                    { value: "3", label: "Admin" },
                    { value: "4", label: "Staff" },
                  ]}
                  className="min-h-[55px]"
                />
              </Form.Item>
            </div>

            {/* username, pass & confirm password */}
            <div className="flex items-center gap-3">
              {/* username */}
              <Form.Item
                className="w-full"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input first name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Username *"
                  className="rounded-md bg-white border border-red-400 pl-6"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>

              {/* password */}
              <Form.Item
                className="w-full"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password *"
                  className="rounded-md bg-white border border-red-400 pl-6"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>

              {/* confirm password */}
              <Form.Item
                className="w-full"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm password *"
                  className="rounded-md bg-white border border-red-400 pl-6"
                  // visibilitytoggle={value.toString()}
                />
              </Form.Item>
            </div>

            <div className="w-full flex gap-5 justify-center ">
              <button className="border bg-red-700 text-white px-8 py-2 rounded-md border-red-700">
                Add User
              </button>
              <button className="border border-red-700 text-red-700 px-10 rounded">
                cancel
              </button>
            </div>
          </Form>
        </AddAdminModal>
      </div>
    </>
  );
};

export default Admin;
