import { Table } from "antd";
import { Link } from "react-router-dom";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useGetRecentUserQuery } from "../features/dashboard/dashboardSlice";
import LoadingSpinner from "./LoadingSpinner";

const DashboardHomeTable = () => {
  const {
    data: recentUsers,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetRecentUserQuery();

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
    // const filteredBuyers = buyersList.data.result.filter(
    //   (d) => d.loginStatus === "approved"
    // );

    if (recentUsers.data.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">No buyers found.</div>
      );
    } else {
      pageContent = (
        <Table
          columns={columns}
          dataSource={recentUsers.data.map((item, index) => ({
            key: item._id,
            index: index + 1, // SL number
            name: item.buyer
              ? `${item.buyer.firstName || ""} ${
                  item.buyer.lastName || ""
                }`.trim() || "Not available"
              : "Not available",

            email: item.email || "Not available",
            phone: item.phone || "Not available",
            // transAmount: item.transAmount || "Not available",
            // subscription: item.subscription || "Not available",
          }))}
          pagination={false}
          className="rounded-lg"
        />
      );
    }
  }

  return (
    <div className="rounded-lg border pt-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Recent Users</h3>
      {/* Ant Design Table */}
      {pageContent}
    </div>
  );
};

export default DashboardHomeTable;
