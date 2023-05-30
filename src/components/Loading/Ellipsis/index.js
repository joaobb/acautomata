import "./style.css";
import { twMerge } from "tailwind-merge";

function LoadingEllipsis({ className }) {
  return (
    <div className={twMerge("lds-ellipsis", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export { LoadingEllipsis };
