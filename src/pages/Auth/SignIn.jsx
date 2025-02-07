import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RoundedButton from "../../Components/RoundedButton";
import { useLoginMutation } from "../../features/user/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Cookies } from "react-cookie";
// import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
// import { setUser } from "../../redux/features/Auth/authSlice";
// import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();
  const cookies = new Cookies();

  const onFinish = async (values) => {
    try {
      const res = await loginUser(values);
      if (res?.data?.success && res?.data?.data?.accessToken) {
        let userProfile = res?.data?.data?.user;
        if (userProfile?.password) {
          const { password, ...rest } = userProfile;
          cookies.set("user_profile", rest, { path: "/" });
          dispatch(setUser(rest));
        }
        toast.success("Login Successfull.");
        navigate("/");
      } else if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something wen wrong!");
    }
  };
  return (
    <div className="min-h-[92vh] w-full flex justify-center items-center gap-1 lg:gap-8 z-10">
      <div className="lg:p-[1%] p-[2%] bg-white rounded-xl order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px]">
          <div className="pb-[30px] space-y-2">
            <h1 className="text-[33px] text-center font-semibold ">
              Login to Account!
            </h1>
            <p className="text-hash text-center lg:text-lg">
              Please enter your email and password to continue.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            // initialValues={{
            //   remember: false,
            // }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            <Form.Item
              label={
                <span className="font-medium text-base font-lora text-black-300">
                  Email
                </span>
              }
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid Email!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="admin@gmail.com"
                className="rounded-full border-none bg-white-600 pl-6 focus-within:shadow-none focus-within:bg-white-600 hover:bg-white-600"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-medium text-base font-lora text-black-300">
                  Password
                </span>
              }
              className="mt-6"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
                className="rounded-full border-none bg-white-600 pl-6 focus-within:shadow-none focus-within:bg-white-600 hover:bg-white-600"
                // visibilitytoggle={value.toString()}
              />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item>
                <Link
                  to={"/auth/forgot-password"}
                  // type="link"
                  className="text-base text-black-200 hover:text-black-300 font-medium text-info"
                >
                  Forget password?
                </Link>
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <RoundedButton>
                {isLoading ? (
                  <div className="flex gap-2 items-center">
                    <span>Signing in</span>
                    <LoadingSpinner size={5} color="stroke-white" />
                  </div>
                ) : (
                  "Sign In"
                )}
              </RoundedButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
