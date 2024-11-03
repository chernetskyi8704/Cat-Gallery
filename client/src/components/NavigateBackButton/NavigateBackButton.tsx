import React from "react";

interface INavigateBackButtonProps {
  navigateBack: () => void;
  children: React.ReactNode;
}

const NavigateBackButton = ({
  navigateBack,
  children,
}: INavigateBackButtonProps) => {
  return (
    <button className={`common-button-select`} onClick={navigateBack}>
      {children}
    </button>
  );
};

export default NavigateBackButton;
