import React from "react";

interface ICenteredLoaderWrapperProps {
  children: React.ReactNode;
}

const CenteredLoaderWrapper = ({ children }: ICenteredLoaderWrapperProps) => {
  return (
    <div className="flex items-center justify-center grow">
      <div className="w-[50px] h-[50px]">{children}</div>
    </div>
  );
};

export default CenteredLoaderWrapper;
