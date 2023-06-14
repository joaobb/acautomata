import React from "react";

interface BasePageContentProps {
  children: React.ReactNode;
}

export const BasePageContent: React.FC<BasePageContentProps> = ({
  children,
}) => {
  return <div className="main mx-auto">{children}</div>;
};
