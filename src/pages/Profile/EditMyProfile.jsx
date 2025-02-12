import React, { useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { MdCameraAlt } from "react-icons/md";
import { getImageUrl } from "../../utils/getImageUrl";
import { useDispatch } from "react-redux";
import { useUpdateAdminProfileMutation } from "../../features/user/authSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { setUser } from "../../features/user/userSlice";
import useAuth from "../../hooks/useAuth";
import localStorageUtil from "../../utils/localstorageutils";

const defaultThumbnail =
  "https://www.clipartmax.com/png/middle/443-4437996_pin-headshot-clipart-headshot-placeholder.png";

const EditMyProfile = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const user = useAuth();
  const profileImage = getImageUrl(user?.image, defaultThumbnail);

  const onFinish = async (values) => {
    const updatedData = { ...values };

    if (image) {
      updatedData.image = image;
    }

    // Create a new FormData instance
    const formData = new FormData();

    // Append each field to the FormData
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    try {
      const res = await updateProfile(formData);

      if (res.data?.success) {
        toast.success("Profile updated successfully.");
        localStorageUtil.removeItem("user_profile");
        localStorageUtil.setItem("user_profile", res.data?.data);
        dispatch(setUser(res.data?.data));
        navigate(-1);
      }
    } catch (error) {
      toast.error(
        "Something went wrong during profile update. try again please."
      );
    }
  };

  const handleImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const selectedImageUrl = URL.createObjectURL(file);
    if (file) {
      setSelectedImage(selectedImageUrl);
      setImage(file);
    }
  };

  const profileData = {
    firstName: user?.firstName || "Not found",
    lastName: user?.lastName || "Not found",
    email: user?.email || "Not found",
    phone: user?.phone,
    profileImage,
  };

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <PageHeading title={"Edit Personal information"} backPath={-1} />
      </div>
      <div className="rounded-lg py-4 border-[#f8f8f8] bg-[#f1f1f1] border-2 shadow-lg mt-8 ">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
            Personal information
          </h3>
          <div className="w-full">
            <Form
              name="basic"
              layout="vertical"
              className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                phone: profileData.phone,
                image: profileData.image,
              }}
            >
              <div className="col-span-3 space-y-6 ">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-red-400 rounded-md bg-lightGray/15">
                  <div className="my-2 relative group">
                    <img
                      src={selectedImage || profileData.profileImage}
                      onError={(e) => (e.target.src = defaultThumbnail)}
                      alt="profile picture"
                      className="h-28 w-28 rounded-full border-4 border-black"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      name="image"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <div
                      className="absolute top-0 h-28 w-28 rounded-full hidden group-hover:flex justify-center items-center bg-[#00000080] cursor-pointer"
                      onClick={handleImageUpload}
                    >
                      <MdCameraAlt color="white" size={30} />
                    </div>
                  </div>
                  <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
                  <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
                </div>
              </div>
              <div className="col-span-9 space-y-[14px] w-full">
                <Form.Item
                  className="text-lg  font-medium text-black -mb-1"
                  label="First Name"
                  name="firstName"
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
                </Form.Item>
                <Form.Item
                  className="text-lg  font-medium text-black -mb-1"
                  label="Last Name"
                  name="lastName"
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
                </Form.Item>
                <Form.Item
                  className="text-lg  font-medium text-black"
                  label="Email"
                  name="email"
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
                </Form.Item>
                <Form.Item
                  className="text-lg text-[#222222] font-medium"
                  label="Phone Number"
                  name="phone"
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
                </Form.Item>
                <Form.Item className="flex justify-end pt-4">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="border bg-red-700 text-white px-8 py-3 font-lora rounded-md border-red-700"
                  >
                    {isLoading ? (
                      <LoadingSpinner size={5} color="stroke-white" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;
