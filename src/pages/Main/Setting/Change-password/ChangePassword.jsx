import { FaArrowLeft } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { useState } from "react";
import RoundedButton from "../../../../Components/RoundedButton";
import { useAdminPasswordChangeMutation } from "../../../../features/user/authSlice";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [changePass, { isLoading }] = useAdminPasswordChangeMutation();

  const toggleVisibility = (field) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onFinish = async (values) => {
    try {
      const res = await changePass(values).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[725px] mx-auto py-10 px-8">
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl">Change Password</h1>
          </div>
          <h1>Your password must be 8-10 characters long.</h1>

          {/* Ant Design Form */}
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            {/* Current Password */}
            <Form.Item
              label={<h1 className="text-xl">Enter current password</h1>}
              name="currentPassword"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <div className="relative flex items-center">
                <MdLockOutline
                  color="#9C1B1B"
                  className="absolute left-3 z-10"
                />
                <Input
                  type={visible.currentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-10 py-2 border bg-[#FAFAFA] border-red-400 rounded-lg placeholder:text-black-300 focus:border focus:border-black"
                />
                {visible.currentPassword ? (
                  <FaEye
                    className="absolute right-3 cursor-pointer"
                    onClick={() => toggleVisibility("currentPassword")}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute right-3 cursor-pointer"
                    onClick={() => toggleVisibility("currentPassword")}
                  />
                )}
              </div>
            </Form.Item>

            {/* New Password */}
            <Form.Item
              label={<h1 className="text-xl">Set new password</h1>}
              name="newPassword"
              rules={[
                { required: true, message: "This field is required" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <div className="relative flex items-center">
                <MdLockOutline
                  color="#9C1B1B"
                  className="absolute left-3 z-10"
                />
                <Input
                  type={visible.newPassword ? "text" : "password"}
                  placeholder="Set new password"
                  className="w-full pl-10 pr-10 py-2 border bg-[#FAFAFA] border-red-400 rounded-lg placeholder:text-black-300 focus:border focus:border-black"
                />
                {visible.newPassword ? (
                  <FaEye
                    className="absolute right-3 cursor-pointer"
                    onClick={() => toggleVisibility("newPassword")}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute right-3 cursor-pointer"
                    onClick={() => toggleVisibility("newPassword")}
                  />
                )}
              </div>
            </Form.Item>

            {/* Confirm New Password */}
            <Form.Item
              label={<h1 className="text-xl">Re-enter new password</h1>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "This field is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <div className="relative flex items-center">
                <MdLockOutline
                  color="#9C1B1B"
                  className="absolute left-3 z-10"
                />
                <Input
                  type={visible.confirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-10 py-2 border bg-[#FAFAFA] border-red-400 rounded-lg placeholder:text-black-300 focus:border focus:border-black"
                />
                {visible.confirmPassword ? (
                  <FaEye
                    className="absolute right-3 cursor-pointer"
                    onClick={() => toggleVisibility("confirmPassword")}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute right-3 cursor-pointer"
                    onClick={() => toggleVisibility("confirmPassword")}
                  />
                )}
              </div>
            </Form.Item>

            {/* Forgot Password */}
            <p
              className="mt-4 text-sm text-red-500 font-bold cursor-pointer hover:underline"
              onClick={() => navigate(`forgot-password`)}
            >
              Forgot Password?
            </p>

            {/* Submit Button */}
            <Form.Item>
              <RoundedButton
                type="primary"
                htmlType="submit"
                className="mt-6 w-full bg-red-700 text-white py-4 rounded-full font-lora"
              >
                {isLoading ? (
                  <LoadingSpinner size={5} color="stroke-white" />
                ) : (
                  "Update Password"
                )}
              </RoundedButton>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
