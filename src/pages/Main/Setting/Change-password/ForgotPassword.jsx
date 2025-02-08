import { FaArrowLeft, FaRegEyeSlash } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { LuMailOpen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../../features/user/authSlice";
import { useState } from "react";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import localStorageUtil, {
  getItemWithExpiration,
} from "../../../../utils/localstorageutils";
import PageHeading from "../../../../Components/PageHeading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const evMessage = getItemWithExpiration("evMessage");

  const [loggedInUserEmail, setLoggedInUserEmail] = useState({
    email: user?.email || "",
  });
  const [validationMesaage, setValidationMessage] = useState(null);

  const [sendEmail, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPass = async () => {
    try {
      const res = await sendEmail(loggedInUserEmail).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        navigate("verify-email");
      }
    } catch (error) {
      toast.error(error.data.message);
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
              backPath={"/settings/change-password"}
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
                  onChange={(e) => {
                    const userEmail = e.target.value;
                    setLoggedInUserEmail(userEmail);
                    if (user?.email !== userEmail) {
                      setValidationMessage(
                        "Email didn't match with your email"
                      );
                    } else {
                      setValidationMessage(null);
                    }
                  }}
                  placeholder="Enter your email"
                  value={loggedInUserEmail?.email}
                  className="w-full pl-10 pr-10 py-2 border border-red-400 rounded-lg placeholder:text-black-300 focus:outline-none focus:border focus:border-black"
                />
              </div>
              {validationMesaage && (
                <p className="text-red-500 text-sm mt-2">{validationMesaage}</p>
              )}
            </div>
            {/* // ))} */}
          </div>

          {/* Send OTP Button */}
          <button
            disabled={validationMesaage || isLoading}
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
