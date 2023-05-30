import { twMerge } from "tailwind-merge";

const BaseLogo = ({ className, ...props }) => {
  return (
    <span
      title={"Finite Automata Validation App"}
      {...props}
      className={twMerge(
        "text-2xl font-bold text-center mx-auto rounded-full border border-gray-700 p-4 select-none",
        className
      )}
    >
      Fava
    </span>
  );
};

export default BaseLogo;
