import { LuMailOpen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../../features/user/authSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";
import localStorageUtil, {
  getItemWithExpiration,
} from "../../utils/localstorageutils";
import PageHeading from "../../Components/PageHeading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const evMessage = getItemWithExpiration("evMessage");

  const [emailForOtp, setEmailForOtp] = useState({
    email: "",
  });

  const [sendEmail, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPass = async () => {
    try {
      const res = await sendEmail(emailForOtp).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        localStorageUtil.setItem("otpEmail", emailForOtp?.email);
        navigate("/auth/verify-email");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[468px] mx-auto py-10 px-8">
        <div className="flex flex-col  w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          <div>
            {evMessage && (
              <p className="text-lg text-center text-blue-900 font-bold">
                {evMessage}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <PageHeading
              backPath={"/auth/sign-in"}
              title={"Forgot Password"}
              showArrow={true}
            />
          </div>
          <h1>Please enter your email address to reset your password </h1>
          {/* Input Fields */}
          <div className="flex flex-col w-full space-y-4">
            <div>
              <h1 className="mb-3 text-xl">Enter your email</h1>
              <div className="relative flex items-center">
                {/* Lock Icon */}
                <LuMailOpen color="#9C1B1B" className="absolute left-3 " />
                {/* Input Field */}
                <input
                  type="email"
                  value={emailForOtp?.email}
                  onChange={(e) => {
                    const userEmail = e.target.value;
                    setEmailForOtp({ email: userEmail });
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-10 py-2 border border-red-400 rounded-lg placeholder:text-black-300 focus:outline-none focus:border focus:border-black"
                />
              </div>
            </div>
            {/* // ))} */}
          </div>

          {/* Send OTP Button */}
          <button
            disabled={isLoading}
            className="mt-6 w-full flex justify-center bg-red-700 disabled:bg-red-700/40 disabled:cursor-not-allowed text-white py-2 rounded-full hover:bg-red-900"
            onClick={handleForgotPass}
          >
            {isLoading ? (
              <LoadingSpinner size={5} color="stroke-white" />
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
