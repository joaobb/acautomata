import { twMerge } from "tailwind-merge";

const BaseLogo = ({ className, ...props }) => {
  return (
    <span
      {...props}
      className={twMerge(
        "text-2xl font-bold text-center mx-auto rounded-full border border-gray-700 p-4",
        className
      )}
    >
      q0
    </span>
  );
};

export default BaseLogo;
