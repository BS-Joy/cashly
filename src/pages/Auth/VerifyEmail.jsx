import { Input } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../features/user/authSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";
import localStorageUtil from "../../utils/localstorageutils";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const emailForOtpVerification = localStorageUtil.getItem("otpEmail");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [reSendOtp, { isLoading: resendIsLoading }] =
    useForgotPasswordMutation();

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handleResendOtp = async () => {
    try {
      const response = await reSendOtp({
        email: emailForOtpVerification,
      }).unwrap();
      if (response?.success) {
        toast.success("OTP has been resent successfully!");
      } else {
        toast.error(response?.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      if (!emailForOtpVerification) {
        toast.error("Nothing found on localstorage!");
        return;
      }
      const verificationData = {
        email: emailForOtpVerification,
        oneTimeCode: parseInt(otp),
      };
      const response = await verifyEmail(verificationData).unwrap();
      if (response?.success) {
        localStorageUtil.setItem("resetPassToken", response?.data?.data);
        toast.success("Email verified successfully!");
        localStorageUtil.removeItem("rpev");
        localStorageUtil.setItem("rpev", true);
        navigate("/auth/reset-password"); // Navigate to reset-password page on success
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
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[468px] mx-auto py-10 px-8 z-10">
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
            <button
              onClick={handleResendOtp}
              className="text-red-500 cursor-pointer hover:underline"
            >
              {resendIsLoading ? (
                <LoadingSpinner size={5} color="stroke-primary" />
              ) : (
                "Resend"
              )}
            </button>
          </div>

          {/* Verify OTP Button */}
          <button
            className="mt-6 w-full bg-red-700 text-white py-2 rounded-full flex justify-center hover:bg-red-800/90"
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
