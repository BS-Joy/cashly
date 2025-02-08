import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import DomPurify from "dompurify";
import { FaAngleLeft } from "react-icons/fa6";
import { useGetTermsConditionQuery } from "../../features/dashboard/dashboardSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";

const TermsConditions = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isSuccess } =
    useGetTermsConditionQuery();

  let termsCondition;

  if (isLoading) {
    termsCondition = (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  if (isError) {
    termsCondition = <p className="text-red-500">Something went wrong!</p>;
  }

  if (isSuccess) {
    termsCondition = (
      <div className="space-y-5 text-black text-sm">
        <p
          dangerouslySetInnerHTML={{
            __html: DomPurify.sanitize(
              data?.data?.description || "No terms and condition"
            ),
          }}
        >
          {/* {data?.data?.description} */}
        </p>
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
          Terms & Condition{" "}
        </h1>
      </div>
      <div className="rounded-lg py-4 border-[#f8f8f8] bg-[#f1f1f1] border-2 shadow-lg mt-8">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Terms & Condition
          </h3>
          <div className="w-full px-16">
            {termsCondition}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => navigate(`edit`)}
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

export default TermsConditions;
