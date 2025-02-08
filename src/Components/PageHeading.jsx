import React from "react";
import { FaAngleLeft, FaArrowLeftLong, FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const PageHeading = ({
  title,
  backPath,
  disbaledBackBtn,
  className,
  showArrow,
}) => {
  const navigate = useNavigate();
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {!disbaledBackBtn && (
        <button
          className="outline-none px-2"
          onClick={() => navigate(backPath || "/settings")}
        >
          {showArrow ? (
            <FaArrowLeftLong size={22} />
          ) : (
            <FaAngleLeft size={22} />
          )}
        </button>
      )}
      {!!title && <h1 className="text-[25px] font-medium">{title}</h1>}
    </div>
  );
};

export default PageHeading;
