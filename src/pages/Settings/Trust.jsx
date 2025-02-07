import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { FaAngleLeft } from "react-icons/fa6";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useGetTrustSafetyQuery } from "../../features/dashboard/dashboardSlice";

const Trust = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isSuccess } =
    useGetTrustSafetyQuery();

  let trust;

  if (isLoading) {
    trust = (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  if (isError) {
    trust = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess) {
    trust = (
      <div className="space-y-5 text-black text-sm">
        <p>{data?.data?.description || "No terms and condition"}</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <button onClick={() => navigate(-1)}>
          <FaAngleLeft className="" />
        </button>
        <h1 className="text-[26px] font-semibold text-grey-800">
          Trust & Safety{" "}
        </h1>
      </div>
      <div className="rounded-lg py-4 border-[#f8f8f8] bg-[#f1f1f1] border-2 shadow-lg mt-8">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Trust & Safety
          </h3>
          <div className="w-full px-16">
            {trust}
            <div className="flex justify-end pt-4">
              <button
                onClick={(e) => navigate(`edit`)}
                // size="large"
                // type="primary"
                className="px-8 py-4 bg-red-700 text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trust;
