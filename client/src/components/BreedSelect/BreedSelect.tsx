import React from "react";
import { INITIAL_BREED_VALUE } from "@/utils/constants";

interface IBreedSelectProps {
  breedsValue: string;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  breedsData: { id: string; name: string }[];
}

const BreedSelect = ({
  breedsValue,
  handleBreedChange,
  breedsData,
}: IBreedSelectProps) => {
  return (
    <select
      name="breed"
      id="breed-select"
      value={breedsValue}
      onChange={handleBreedChange}
      className={`common-button-select`}
    >
      <option value={INITIAL_BREED_VALUE}>All breeds</option>
      {breedsData &&
        breedsData.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
    </select>
  );
};

export default BreedSelect;
