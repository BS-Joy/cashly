import React from "react";
import { Outlet } from "react-router-dom";
import authBg from "../../assets/images/auth-bg.png";
import authBgBars from "../../assets/images/auth-bg-bars.png";

const Auth = () => {
  return (
    <div
      className="w-full h-screen bg-red-200 bg-cover flex justify-center relative"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <Outlet />
      <div className="absolute bottom-0 right-0 z-0">
        <img src={authBgBars} alt="bg bars" />
      </div>
    </div>
  );
};

export default Auth;
