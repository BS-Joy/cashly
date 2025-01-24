import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/reset-pass.png";
// import ComponentContainer from "../../Components/ComponentContainer";
import PageHeading from "../../Components/PageHeading";
import RoundedButton from "../../Components/RoundedButton";
// import { useChangePasswordMutation } from "../../redux/features/Auth/authApi";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { setUser } from "../../redux/features/Auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const [mutation, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values) => {
    console.log("on finish");
    navigate("/auth/success-pass-change");
    // try {
    //   const response = await mutation({
    //     password: values.newPassword,
    //     // token: token,
    //   });
    //   if (response?.data?.statusCode == 200) {
    //     localStorage.setItem("verify-token", null);
    //     dispatch(
    //       setUser({
    //         user: null,
    //         token: null,
    //       })
    //     );
    //     navigate("/auth");
    //     Swal.fire({
    //       icon: "success",
    //       title: response?.data?.message,
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "failed!",
    //       text:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Failed !!",
    //     text: "Something went wrong.",
    //   });
    // }
  };
  return (
    <div className="min-h-[92vh] w-full flex justify-center items-center gap-1 lg:gap-8 z-10">
      {/* <div className="lg:border-r-2 border-primary mx-auto w-[96%] lg:p-[10%] ">
          <img src={image} alt="" />
        </div> */}
      <div className="lg:p-[1%] bg-white order-first lg:order-last rounded-xl">
        <div className="w-full py-[44px] lg:px-[44px] space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={-1}
              title={"Set new password"}
              disbaledBackBtn={true}
            />
            <p className=" drop-shadow text-[#464343] mt-5">
              Your password must be 8-10 character long.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label={
                <span className="font-medium text-base">New Password</span>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input new password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
                className="rounded-full border-none bg-white-600 pl-6 focus-within:shadow-none focus-within:bg-white-600 hover:bg-white-600"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-medium text-base">
                  Confirm New Password
                </span>
              }
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: "Please Re-Enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
                className="rounded-full border-none bg-white-600 pl-6 focus-within:shadow-none focus-within:bg-white-600 hover:bg-white-600"
              />
            </Form.Item>
            <div className="w-full flex justify-center pt-4 ">
              <RoundedButton>Update Password</RoundedButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
