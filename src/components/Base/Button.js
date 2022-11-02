import { twMerge } from "tailwind-merge";

const variantClasses = {
  default: "bg-slate-900 text-gray-200 hover:bg-slate-700",
  text: "text-gray-200 hover:bg-slate-700",
  outline:
    "border border-gray-200 text-gray-200 hover:bg-gray-700 focus:ring-2 focus:ring-blue-700 focus:bg-gray-700",
};

const BaseButton = ({
  children,
  variant = "default",
  as: Component = "button",
  ...props
}) => {
  return (
    <Component
      {...props}
      className={twMerge(
        variantClasses[variant],
        "inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4",
        props.className
      )}
    >
      {children}
    </Component>
  );
};

export default BaseButton;
