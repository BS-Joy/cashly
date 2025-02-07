import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { FiEdit } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { FaAngleLeft } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../utils/getImageUrl";

const defaultThumbnail =
  "https://www.clipartmax.com/png/middle/443-4437996_pin-headshot-clipart-headshot-placeholder.png";

const MyProfile = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const profileImage = getImageUrl(user?.image, defaultThumbnail);

  const profileData = {
    name: user?.firstName + user?.lastName || "Not found",
    email: user?.email || "Not found",
    phone: user?.phone,
    profileImage,
  };
  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <PageHeading title={"Personal information"} backPath={-1} />
      </div>
      <div className="rounded-lg py-4 border-[#f8f8f8] bg-[#f1f1f1] border-2 shadow-lg mt-8">
        <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
            <div className="w-full">
              {/* edit profile */}
              <div className="py-4 px-8 flex justify-end items-center">
                {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
                <button
                  onClick={() => navigate(`edit`)}
                  // size="large"
                  // type="default"
                  className="py-5 px-6 bg-white shadow-md text-red-700 border border-red-700 rounded-md font-semibold flex gap-2 items-center"
                >
                  <GoPencil />
                  Edit Profile
                </button>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
                initialValues={{
                  name: profileData.name,
                  email: profileData.email,
                  phone: profileData.phone,
                }}
              >
                <div className="col-span-3 space-y-6 ">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-red-400 rounded-md bg-lightGray/15">
                    <div className="my-2">
                      <img
                        src={profileData?.profileImage}
                        alt="user profile picture"
                        onError={(e) => (e.target.src = defaultThumbnail)}
                        className="h-28 w-28 rounded-full border-[3px] border-red-400"
                      />
                    </div>
                    <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
                    <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg  font-medium text-black -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg border-red-400"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg  font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    className="text-lg text-[#222222] font-medium"
                    label="Phone Number"
                    name="phone"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
