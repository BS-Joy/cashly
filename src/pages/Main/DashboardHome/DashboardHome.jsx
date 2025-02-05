import { useSelector } from "react-redux";
import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import BarChartComponent from "./BarChart";
import DashboardSummary from "./DashboardSummary";

const DashboardHome = () => {
  const user = useSelector((state) => state.user.user);

  // console.log(user);
  return (
    <div className="space-y-[24px]">
      <DashboardSummary />
      <BarChartComponent />
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
