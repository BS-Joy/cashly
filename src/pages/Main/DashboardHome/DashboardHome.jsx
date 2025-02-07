import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import BarChartComponent from "./BarChart";
import DashboardSummary from "./DashboardSummary";

const DashboardHome = () => {
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
