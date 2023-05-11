import { twMerge } from "tailwind-merge";

const BaseLogo = ({ className, ...props }) => {
  return (
    <span
      {...props}
      className={twMerge(
        "flex items-center text-2xl font-bold text-center mx-auto rounded-full border text-orange-600 border-orange-600 p-4 select-none",
        className
      )}
    >
      FAVA
    </span>
  );
};

export default BaseLogo;
