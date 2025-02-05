import { cn } from "../lib/utils";

const RoundedButton = ({ children, onClickHandler, className }) => {
  return (
    <button
      // disabled={isLoading}
      type="submit"
      className={cn(
        `w-full px-2 py-3 bg-red-700 text-white rounded-full flex items-center justify-center`,
        className
      )}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
