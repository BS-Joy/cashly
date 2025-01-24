import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoundedButton from "../../Components/RoundedButton";
// import { useDispatch } from "react-redux";
// import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
// import { setUser } from "../../redux/features/Auth/authSlice";
// import Swal from "sweetalert2";

const SuccessPasswordChange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch();
  // const [setData, { isLoading }] = usePostLoginMutation();
  const onFinish = async (values) => {
    navigate("/auth/sign-in");
    // try {
    //   const response = await setData(values);
    //   // console.log(response);
    //   if (response?.data?.statusCode == 200) {
    //     if (response?.data?.data?.user?.role === "ADMIN") {
    //       localStorage.setItem("token", response?.data?.data?.token);
    //       dispatch(
    //         setUser({
    //           user: response?.data?.data?.user,
    //           token: response?.data?.data?.token,
    //         })
    //       );
    //       // navigate(from, { replace: true });
    //       navigate(location.state ? location.state : "/");
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Login Failed!!",
    //         text: "You are not a Valid",
    //       });
    //     }
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Login Failed!!",
    //       text: "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Login Failed!!",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };
  return (
    <div className="min-h-[92vh] w-full flex justify-center items-center gap-1 lg:gap-8 z-10">
      {/* <div className="lg:border-r-2 border-primary mx-auto w-[92%] lg:p-[15%] lg:pr-[20%] ">
        <img src={image} alt="" />
      </div> */}
      <div className="lg:p-[5%] p-[2%] h-[70%] flex flex-col justify-center bg-white rounded-xl order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px]">
          <div className="pb-[30px] space-y-2">
            <h1 className="text-[33px] text-center font-semibold ">
              Successfully
            </h1>
            <p className="text-hash text-center lg:text-lg">
              Your password has been updated, please change your password
              regularly to avoid this happening
            </p>
          </div>
          <RoundedButton onClickHandler={onFinish}>Continue</RoundedButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessPasswordChange;
