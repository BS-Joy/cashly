import RejectedBuyersTable from "./RejectedBuyersTable";
import RejectedAgenciesTable from "./RejectedAgenciesTable";

const RejectedRequestsPage = () => {
  return (
    <div className="py-4  mt-8">
      <RejectedBuyersTable />
      <RejectedAgenciesTable />
    </div>
  );
};

export default RejectedRequestsPage;
