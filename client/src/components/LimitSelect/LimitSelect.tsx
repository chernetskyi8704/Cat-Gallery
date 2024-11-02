import React from "react";
import { ILimitOption } from "@/utils/constants";

interface LimitSelectProps {
  limitValue: string;
  handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  imagesData: { totalImagesCount: number };
  isImagesSuccess: boolean;
  initialLimitValue: ILimitOption;
  limitOptionsArray: ILimitOption[];
}

const LimitSelect = ({
  limitValue,
  handleLimitChange,
  imagesData,
  isImagesSuccess,
  initialLimitValue,
  limitOptionsArray,
}: LimitSelectProps) => {
  return (
    <select
      name="limit"
      id="image-limit-select"
      value={limitValue}
      onChange={handleLimitChange}
      className={`p-2 bg-gray-100 border-2 rounded-lg hover:border-hover`}
    >
      <option value={initialLimitValue.value}>{initialLimitValue.label}</option>
      {isImagesSuccess &&
        imagesData &&
        limitOptionsArray?.map(({ id, value, label }) => {
          if (
            value !== initialLimitValue.value &&
            imagesData.totalImagesCount >= +value
          ) {
            return (
              <option key={id} value={value}>
                {label}
              </option>
            );
          }
          return null;
        })}
    </select>
  );
};

export default LimitSelect;
