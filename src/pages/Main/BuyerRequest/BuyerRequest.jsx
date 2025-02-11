import toast from "react-hot-toast";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import {
  useGetAllBuyersQuery,
  useGetBuyersDocQuery,
} from "../../../features/buyeragency/buyerAgencySlice";
import BuyerRequestCard from "./BuyerRequestCard";

const BuyerRequest = () => {
  const {
    data: buyers,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllBuyersQuery("pending");

  const {
    data,
    isLoading: docLoading,
    isError: docError,
    isSuccess: docSuccess,
  } = useGetBuyersDocQuery();

  let allBuyerDocs;

  let pageContent;

  if (isLoading || docLoading) {
    pageContent = (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  if (isError || docError) {
    pageContent = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess && docSuccess) {
    allBuyerDocs = data?.data?.result;
    const buyersList =
      buyers?.data?.result?.filter((buyer) => buyer?.isSuspended === false) ||
      [];

    if (buyersList?.length === 0) {
      pageContent = (
        <div className="text-center text-gray-500 mt-4">
          No buyers request yet!
        </div>
      );
    } else {
      pageContent = (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {buyersList?.map((item, index) => {
            const buyerDoc = allBuyerDocs?.filter(
              (doc) => doc?.userId?.buyer?._id === item?.buyer?._id
            );
            return <BuyerRequestCard item={item} doc={buyerDoc} key={index} />;
          })}
        </div>
      );
    }
  }

  return <>{pageContent}</>;
};

export default BuyerRequest;
