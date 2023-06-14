import { twMerge } from "tailwind-merge";
import React from "react";

interface BaseLogoProps {
  [key: string]: any;
}

const BaseLogo: React.FC<BaseLogoProps> = ({ className, ...props }) => {
  return (
    <span
      title={"Finite Automata Validation App"}
      {...props}
      className={twMerge(
        "text-2xl font-bold text-center mx-auto rounded-full border border-gray-700 p-4 select-none",
        className
      )}
    >
      FAVA
    </span>
  );
};

export default BaseLogo;
