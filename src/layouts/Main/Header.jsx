import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../utils/getImageUrl";

const defaultThumbnail =
  "https://www.clipartmax.com/png/middle/443-4437996_pin-headshot-clipart-headshot-placeholder.png";

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);

  const user = useSelector((state) => state.user.user);

  const profileImage = getImageUrl(user?.image, defaultThumbnail);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  return (
    <div className="w-full h-[88px] flex justify-between items-center rounded-xl py-[16px] px-[32px] shadow-lg bg-white">
      <div className="text-start space-y-0.5">
        <p className="text-sm md:text-2xl font-light leading-[30px]">
          {`Welcome, ${user?.firstName + " " + user?.lastName}`}
        </p>
        <p className="text-sm md:text-base leading-5">{"Have a nice day"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge
            style={{
              backgroundColor: "#932017",
              width: "20px",
              height: "20px",
              objectFit: "contain",
            }}
            count={1}
          >
            <TbBellRinging
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
              color="#932017"
            />
          </Badge>
        </div>
        <div className="flex items-center">
          <div>
            <img
              src={profileImage}
              alt=""
              onError={(e) => (e.target.src = defaultThumbnail)}
              className="rounded-full h-[42px] w-[42px]"
            />
          </div>
          {/* <Select
            defaultValue="Jane Cooper"
            style={{
              width: 120,
            }}
            variant="borderless"
            suffixIcon={
              <MdOutlineKeyboardArrowDown color="black" fontSize={20} />
            }
            onChange={handleChange}
            options={[
              {
                value: "Jane Cooper",
                label: "Jane Cooper",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
            ]}
          /> */}
          <p className="ml-4">
            {user?.firstName + "  " + user?.lastName || "Name unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
