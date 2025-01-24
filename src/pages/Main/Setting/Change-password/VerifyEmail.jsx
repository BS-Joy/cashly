import { Input } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[468px] mx-auto py-10 px-8">
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <FaArrowLeft />
            <h1 className="text-2xl">Verify Email</h1>
          </div>
          <h1>Please enter the OTP we have sent you in your email. </h1>

          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            {...sharedProps}
            size="large"
          />

          <div className="flex justify-between items-center">
            <h1>Didn’t receive the code?</h1>
            <h1 className="text-red-500">Resend</h1>
          </div>
          {/* Send OTP Button */}
          <button
            className="mt-6 w-full bg-red-700 text-white py-2 rounded-full hover:bg-gray-800"
            onClick={(e) => navigate(`reset-password`)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
