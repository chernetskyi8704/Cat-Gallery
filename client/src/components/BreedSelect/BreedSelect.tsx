import React from "react";

interface IBreedSelectProps {
  breedsValue: string;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  breedsData: { id: string; name: string }[];
  isBreedsSuccess: boolean;
}

const BreedSelect = ({
  breedsValue,
  handleBreedChange,
  breedsData,
  isBreedsSuccess,
}: IBreedSelectProps) => {
  return (
    <select
      name="breed"
      id="breed-select"
      value={breedsValue}
      onChange={handleBreedChange}
      className={`p-2 bg-gray-100 border-2 rounded-lg hover:border-hover`}
    >
      <option value="All breeds">All breeds</option>
      {isBreedsSuccess &&
        breedsData &&
        breedsData.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
    </select>
  );
};

export default BreedSelect;
