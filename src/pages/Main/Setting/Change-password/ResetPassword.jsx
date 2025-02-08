import { FaArrowLeft } from "react-icons/fa6";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import RoundedButton from "../../../../Components/RoundedButton";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import toast from "react-hot-toast";
import localStorageUtil from "../../../../utils/localstorageutils";
import { useResetPasswordMutation } from "../../../../features/user/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const resetPassToken = localStorageUtil.getItem("resetPassToken");

  const onFinish = async (values) => {
    try {
      const response = await resetPassword({
        values,
        token: resetPassToken,
      }).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Password reset successful!");
        localStorageUtil.removeItem("resetPassToken");
        navigate("/settings");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[500px] mx-auto py-10 px-8">
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
            <h1 className="text-2xl">Reset Password</h1>
          </div>
          <h1>Your password must be 8-10 characters long.</h1>

          {/* Ant Design Form */}
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <div className="flex flex-col w-full">
              {[
                {
                  name: "newPassword",
                  label: "Set your new password",
                  placeholder: "Set your password",
                },
                {
                  name: "confirmPassword",
                  label: "Re-enter new password",
                  placeholder: "Re-enter password",
                },
              ].map(({ name, label, placeholder }, index) => (
                <Form.Item
                  key={index}
                  name={name}
                  label={<span className="text-black">{label}</span>} // No asterisk
                  rules={
                    name === "confirmPassword"
                      ? [
                          {
                            required: true,
                            message: "Please confirm your password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("newPassword") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match!")
                              );
                            },
                          }),
                        ]
                      : [
                          {
                            required: true,
                            message: "Please enter a new password",
                          },
                          {
                            min: 8,
                            max: 10,
                            message: "Password must be 8-10 characters",
                          },
                        ]
                  }
                >
                  <div className="relative flex items-center">
                    <Input.Password
                      placeholder={placeholder}
                      className="w-full pl-10 pr-10 py-2 border border-red-400 rounded-lg placeholder:text-black-300 focus:outline-none focus:border focus:border-black focus:ring-0"
                    />
                    {/* Lock Icon */}
                    <MdLockOutline
                      color="#9C1B1B"
                      className="absolute left-3 z-10"
                    />
                  </div>
                </Form.Item>
              ))}
            </div>

            {/* Reset Password Button */}
            <Form.Item>
              <RoundedButton
                className="mt-6 w-full bg-red-700 text-white py-4 rounded-full hover:bg-red-800/90"
                htmlType="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size={5} color="stroke-white" />
                ) : (
                  "Reset Password"
                )}
              </RoundedButton>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
