import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useGetBuyersDocQuery } from "../../../features/buyer/buyerAgencySlice";
import BuyerRequestCard from "./BuyerRequestCard";

const BuyerRequest = () => {
  const {
    data: buyersList,
    isLoading,
    isError,
    isSuccess,
  } = useGetBuyersDocQuery();

  let pageContent;

  if (isLoading) {
    pageContent = (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  if (isError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess) {
    if (buyersList.data.result.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">
          No buyers request yet!
        </div>
      );
    } else {
      pageContent = (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {buyersList.data.result.map((item, index) => (
            <BuyerRequestCard item={item} key={index} />
          ))}
        </div>
      );
    }
  }

  return <>{pageContent}</>;
};

export default BuyerRequest;
