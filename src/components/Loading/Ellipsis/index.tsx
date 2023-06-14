import "./style.css";
import { twMerge } from "tailwind-merge";
import React from "react";

interface LoadingEllipsisProps {
  className?: string;
}

const LoadingEllipsis: React.FC<LoadingEllipsisProps> = ({ className }) => {
  return (
    <div className={twMerge("lds-ellipsis", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { LoadingEllipsis };
