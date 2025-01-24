import { GoPlus } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io";
import RoundedButton from "../../../Components/RoundedButton";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const subscriptions = [
  {
    title: "Basic",
    price: "$10/month",
    features: [
      "View Members Directory",
      "View Members Profile",
      "Send Private Messages",
      "Add Media To Your Profile",
    ],
  },
  {
    title: "Premium",
    price: "$20/month",
    features: [
      "View Members Directory",
      "View Members Profile",
      "Send Private Messages",
      "Add Media To Your Profile",
    ],
  },
];

export default function Subscription() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 pr-10">
      <div className="flex justify-end mt-5">
        <button
          className="border border-red-700 text-red-700 py-3 px-6 rounded-lg flex items-center gap-3 bg-white"
          onClick={() => navigate("add-subscription")}
        >
          <GoPlus size={"20px"} />
          Add New Subscription
        </button>
      </div>

      {/* subscription cards */}
      <div className="flex justify-center gap-10">
        {subscriptions?.map((sub, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl max-w-[450px] w-full shadow-lg"
          >
            {/* title and price */}
            <div className="pt-16 pb-9 px-14 border-b-[.5px] border-b-red-400">
              <h3 className="text-[34px] px-11 mb-4 capitalize text-red-700 text-center">
                {sub?.title}
              </h3>
              <p className="text-[29px] text-center uppercase text-red-400">
                {sub?.price}
              </p>
            </div>

            {/* features */}
            <ul className="flex flex-col gap-10 py-11 pl-24">
              {sub?.features?.map((f, index) => (
                <li key={index} className="flex items-center gap-3">
                  <IoIosCheckmarkCircle size={"20px"} color="#E35151" />
                  {f}
                </li>
              ))}
            </ul>

            {/* button */}
            <div className="flex justify-center py-9">
              <RoundedButton
                onClickHandler={() =>
                  navigate("edit-subscription", {
                    state: {
                      subscriptionData: sub,
                    },
                  })
                }
                className="w-fit px-16"
              >
                Edit
              </RoundedButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
