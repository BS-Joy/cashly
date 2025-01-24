import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { Form, Input, Select } from "antd";
import RoundedButton from "../../../Components/RoundedButton";
import { useEffect, useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const EditSubscription = () => {
  const location = useLocation();
  const { subscriptionData } = location.state || {};

  const [features, setFeatures] = useState(subscriptionData?.features || [""]);

  const addNewFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleNewFeature = (e, index) => {
    const updatedFeature = e.target.value;
    const updatedFeatures = [...features];
    updatedFeatures[index] = updatedFeature; // Update the specific feature at the given index
    setFeatures(updatedFeatures); // Update the state with the modified array
  };

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft color="#932017" />
        <h1 className="text-2xl text-red-700">Edit Subscription</h1>
      </div>
      <div className="rounded-lg py-4 mt-8 ">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <div className="w-full px-16">
            <div className="flex justify-end pt-4">
              <Form
                name="normal_login"
                layout="vertical"
                initialValues={{
                  remember: false,
                }}
                onFinish={() => console.log(features)}
                requiredMark={false}
                className="text-start w-full mt-6"
              >
                {/* package name and amount */}
                <div className="flex gap-6 justify-between">
                  {/* package name */}
                  <Form.Item
                    label={
                      <span className="font-medium text-xl font-lora text-red-700">
                        Package Name
                      </span>
                    }
                    className="w-full"
                    name="package_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input package name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Package Name"
                      className="rounded-md bg-white pl-6 subs"
                      //   visibilitytoggle={false}
                      value={subscriptionData?.title}
                      //   onChange={}
                    />
                  </Form.Item>

                  {/* package amount */}
                  <Form.Item
                    label={
                      <span className="font-medium text-xl font-lora text-red-700">
                        Package Amount
                      </span>
                    }
                    className="w-full"
                    name="package_amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input package amount!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Package Amount"
                      className="rounded-md subs pl-6 w-full"
                      //   visibilitytoggle={false}
                    />
                  </Form.Item>
                </div>

                {/* package expiration */}
                <Form.Item
                  label={
                    <span className="font-medium text-xl font-lora text-red-700">
                      Package Expiration
                    </span>
                  }
                  className="max-w-[600px] w-full"
                  name="package_expiration"
                  rules={[
                    {
                      required: true,
                      message: "Please input package expiration time!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Package Expiration"
                    className="rounded-md bg-white pl-6 subs"
                  />
                </Form.Item>

                {/* package features */}
                <div className="flex flex-col items-center gap-3 mt-16 mb-16">
                  <div className="flex justify-start w-full">
                    <label className="block font-medium text-xl font-lora text-red-700 mb-4 text-start">
                      Package Features
                    </label>
                  </div>
                  <div className="flex w-full flex-col">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-4 mb-4">
                        {/* Input for feature */}
                        <input
                          type="text"
                          placeholder="Add new feature"
                          className="rounded-md bg-white pl-4 py-4 border text-base w-full outline-none border-black-300"
                          value={feature}
                          onChange={(e) => handleNewFeature(e, index)}
                        />
                        {/* Add or Remove Buttons */}
                        {index === features.length - 1 ? (
                          <button
                            type="button"
                            onClick={addNewFeature}
                            disabled={feature === ""}
                            className={`text-red-400 ${
                              feature === ""
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <FiPlusCircle size="20px" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-400"
                          >
                            <FiMinusCircle size="20px" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex gap-5 justify-center ">
                  <RoundedButton className="w-fit px-28">Update</RoundedButton>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubscription;
