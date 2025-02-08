import { Input } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useVerifyEmailMutation } from "../../../../features/user/authSlice";
import useAuth from "../../../../hooks/useAuth";
import localStorageUtil from "../../../../utils/localstorageutils";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [otp, setOtp] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    console.log(typeof otp);

    try {
      const verificationData = {
        email: "badhan101525@gmail.com",
        oneTimeCode: parseInt(otp),
      };
      const response = await verifyEmail(verificationData).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success("Email verified successfully!");
        localStorageUtil.removeItem("rpev");
        localStorageUtil.setItem("rpev", true);
        navigate("reset-password"); // Navigate to reset-password page on success
      } else {
        toast.error(response?.message || "Verification failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[468px] mx-auto py-10 px-8">
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft className="cursor-pointer" />
            </button>
            <h1 className="text-2xl">Verify Email</h1>
          </div>
          <h1>Please enter the OTP we have sent to your email.</h1>

          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            size="large"
            value={otp}
            onChange={handleOtpChange}
          />

          <div className="flex justify-between items-center">
            <h1>Didn’t receive the code?</h1>
            <h1 className="text-red-500 cursor-pointer">Resend</h1>
          </div>

          {/* Verify OTP Button */}
          <button
            className="mt-6 w-full bg-red-700 text-white py-2 rounded-full hover:bg-red-800/90"
            onClick={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size={5} color="stroke-white" />
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
