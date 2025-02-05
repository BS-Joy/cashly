import { Select, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetEarningDataForChartQuery } from "../../../features/dashboard/dashboardSlice";
import ChartLoadingSkeleton from "../../../Components/ChartLoadingSkeleton";

// const earningsData = {
//   success: true,
//   message: "Dashboard earning chart retrieved successfully",
//   data: [
//     {
//       _id: "2025",
//       earnings: [
//         { month: "Jan", totalAmount: 10 },
//         { month: "Feb", totalAmount: 20 },
//         { month: "Mar", totalAmount: 30 },
//         { month: "Apr", totalAmount: 40 },
//         { month: "May", totalAmount: 50 },
//         { month: "Jun", totalAmount: 60 },
//         { month: "Jul", totalAmount: 70 },
//         { month: "Aug", totalAmount: 80 },
//         { month: "Sep", totalAmount: 90 },
//         { month: "Oct", totalAmount: 100 },
//         { month: "Nov", totalAmount: 110 },
//         { month: "Dec", totalAmount: 120 },
//       ],
//     },
//   ],
// };

const BarChartComponent = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetEarningDataForChartQuery();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data?.success) {
      const transformedData = data.data[0].earnings.map((entry) => ({
        name: entry.month,
        earnings: entry.totalAmount,
      }));
      setChartData(transformedData);
    }
  }, [data]);

  if (isLoading) {
    return <ChartLoadingSkeleton />;
  }

  if (isError) {
    return <p>Sorry. Something went wrong!</p>;
  }

  if (isSuccess) {
    return (
      <div>
        <div className="flex items-center justify-between py-7">
          <h1 className="text-sm md:text-2xl text-black-300">
            Earnings Overview
          </h1>
          <Select
            defaultValue="2025"
            style={{ width: 120, color: "#545454" }}
            variant="borderless"
            suffixIcon={
              <MdOutlineKeyboardArrowDown color="gray" fontSize={30} />
            }
            options={[{ value: "2025", label: "2025" }]} // Can be expanded for multiple years
          />
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="earnings" fill="#932017" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default BarChartComponent;
