import { driverItems } from "../../../constants/driver.constants";
import BuyerRequestCard from "./BuyerRequestCard";

const BuyerRequest = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {driverItems.map((item, index) => (
        <BuyerRequestCard item={item} key={index} />
      ))}
    </div>
  );
};

export default BuyerRequest;
