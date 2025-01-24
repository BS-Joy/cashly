import { IoIosNotificationsOutline } from "react-icons/io";

export default function NotificationCard() {
  return (
    <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 hover:bg-gray-100 transition-all">
      <IoIosNotificationsOutline
        style={{ cursor: "pointer" }}
        className={`border border-white w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-red-700 text-white group-hover:bg-[#d34e4e]`}
      />
      <div className="space-y-[2px]">
        <h6 className="text-lg group-hover:text-[#d34e4e]">
          You have received $500 from John Doe
        </h6>
        <small className="text-[12px] text-[#1c8f50]">Fri, 12:30pm</small>
      </div>
    </div>
  );
}
